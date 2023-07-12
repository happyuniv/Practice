import styles from './Debounce.module.css'
import data from '../data.json'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'

type user = {
  gender: string
  name: {
    first: string
  }
  location: {
    country: string
  }
  picture: {
    medium: string
  }
}

function debounce(fn: (...args: any) => void, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export default function Debounce() {
  const [users, setUsers] = useState<user[]>([])
  const [count, setCount] = useState(0)
  const [debounceCount, setDebounceCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUsers(data.results)
  }, [])

  const filterUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    setUsers(
      data.results.filter((user) =>
        user.name.first.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
    setLoading(false)
  }

  const handleChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setDebounceCount((debounceCount) => debounceCount + 1)
      filterUsers(e)
    }, 500),
    []
  )

  return (
    <>
      <section>
        <h1>Debounce</h1>
        <div className={styles.container}>
          <div className={styles.left}>
            <input
              className={styles.input}
              onChange={(e) => {
                setLoading(true)
                setCount((count) => count + 1)
                handleChange(e)
              }}
              placeholder='Search By Name'
            />
            <div className={styles.container_list}>
              {loading && <span>Loading...</span>}
              {!loading && (
                <ul>
                  {users.map((user) => (
                    <li className={styles.card}>
                      <div className={styles.avatar}>
                        <img src={user.picture.medium} alt='' />
                      </div>
                      <div className={styles.info}>
                        <p>
                          Country: <strong>{user.location.country}</strong>
                        </p>
                        <p>
                          Gender: <strong>{user.gender}</strong>
                        </p>
                        <p>
                          Name: <strong>{user.name.first}</strong>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <p>Function Exectuion Count</p>
            <div>
              No Debounce: <strong>{count}</strong>
            </div>
            <div>
              Debounce: <strong>{debounceCount}</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
