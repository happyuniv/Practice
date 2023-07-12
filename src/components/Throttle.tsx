import { useCallback, useState } from 'react'
import styles from './Throttle.module.css'

function throttle(fn: () => void, ms: number) {
  let flag = false
  return () => {
    if (flag) return
    flag = true
    setTimeout(() => {
      fn()
      flag = false
    }, ms)
  }
}

export default function Throttle() {
  const [count, setCount] = useState(0)
  const [throttleCount, setThrottleCount] = useState(0)

  const handleScroll = useCallback(
    throttle(() => {
      setThrottleCount((throttleCount) => throttleCount + 1)
      console.log('hi')
    }, 500),
    []
  )

  return (
    <>
      <section>
        <h1>Throttle</h1>
        <div className={styles.container}>
          <div className={styles.left}>
            <p>Scroll Event Function</p>
            <div
              className={styles.container_block}
              onScroll={() => {
                setCount((count) => count + 1)
                handleScroll()
              }}
            >
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
            </div>
          </div>
          <div className={styles.right}>
            <p>Function Exectuion Count</p>
            <div>
              No Throttle: <strong>{count}</strong>
            </div>
            <div>
              Throttle: <strong>{throttleCount}</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
