import { useCallback, useEffect, useState } from 'react'
import styles from './InfiniteScroll.module.css'

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

function useIntersectionObserver(callback: () => void) {
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      callback()
      observer.unobserve(entries[0].target)
    }
  })

  const observedRef = useCallback((node: HTMLDivElement) => {
    if (node) intersectionObserver.observe(node)
  }, [])

  useEffect(() => {
    return () => intersectionObserver.disconnect()
  }, [])

  return observedRef
}

export default function InfiniteScroll() {
  const [users, setUsers] = useState<user[]>([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    await new Promise((res) => setTimeout(res, 2000))
    const res = await fetch(`https://randomuser.me/api/?results=5`)
    const data = await res.json()
    setUsers((prev) => [...prev, ...data.results])
    setLoading(false)
  }
  const observedRef = useIntersectionObserver(getData)

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <section>
        <h1>Infinite Scroll</h1>
        <div className={styles.container}>
          <div className={styles.container_inside}>
            {loading && <div className={styles.loading}>Loading...</div>}
            {users.map((user, index) => (
              <div
                className={styles.card}
                ref={users.length - 1 === index ? observedRef : undefined}
              >
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
        </div>
      </section>
    </>
  )
}
