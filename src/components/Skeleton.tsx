import { useEffect, useState } from 'react'
import styles from './Skeleton.module.css'
import data from '../data.json'

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

export default function Skeleton() {
  const [users, setUsers] = useState<user[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      await new Promise((res) => {
        setTimeout(res, 3000)
      })
      setUsers(data.results)
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <>
      <section>
        <h1>Skeleton</h1>
        <div>
          <button onClick={() => setLoading(!loading)}>
            {loading ? 'Loading' : 'Load'}
          </button>
        </div>
        <div className={styles.container}>
          {loading &&
            Array(3)
              .fill(null)
              .map(() => (
                <div className={`${styles.skeleton} ${styles.card}`}>
                  <div>
                    <div
                      className={`${styles.skeleton} ${styles.avatar}`}
                    ></div>
                  </div>
                  <div className={`${styles.skeleton} ${styles.info}`}>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>
                </div>
              ))}
          {!loading &&
            users.slice(0, 3).map((user, index) => (
              <div className={styles.card}>
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
              </div>
            ))}
        </div>
      </section>
    </>
  )
}
