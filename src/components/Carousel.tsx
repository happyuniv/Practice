import { useEffect, useRef, useState } from 'react'
import styles from './Carousel.module.css'

/*
-index paging
-click slide
-touch slide 
-auto slide 
-neighbor appear 
*/
export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mouseDownX, setMouseDownX] = useState(0)
  const [transX, setTransX] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval>>()
  const sample = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ]
  const WINDOW_WIDTH = 350

  useEffect(() => {
    timer.current = setInterval(handleNext, 3000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  const handlePrev = () => {
    setCurrentIndex(
      (currentIndex) => (currentIndex - 1 + sample.length) % sample.length
    )
  }
  const handleNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % sample.length)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouseDownX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseDownX) {
      if (e.clientX - mouseDownX > 0)
        setTransX(Math.min(2 * (e.clientX - mouseDownX), WINDOW_WIDTH))
      else setTransX(Math.min(2 * -(e.clientX - mouseDownX), -WINDOW_WIDTH))
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.clientX - mouseDownX > WINDOW_WIDTH / 3) handlePrev()
    else if (e.clientX - mouseDownX < -WINDOW_WIDTH / 3) handleNext()
    setTransX(0)
    setMouseDownX(0)
  }

  const handleMouseEnter = () => {
    clearInterval(timer.current)
  }

  const handleMouseLeave = () => {
    timer.current = setInterval(handleNext, 3000)
  }

  return (
    <>
      <section>
        <h1>Carousel</h1>
        <div
          className={styles.container}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.window}>
            <div
              className={styles.container_inner}
              style={{
                transform: `translateX(${
                  -WINDOW_WIDTH * currentIndex + transX
                }px)`,
              }}
            >
              {sample.map((item, index) => (
                <div className={styles.item}>{item.value}</div>
              ))}
            </div>
            <div className={styles.pagination}>
              {sample.map((_, index) => (
                <div
                  className={`${styles.index} ${
                    index === currentIndex ? styles.active : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
            </div>
          </div>
          <div className={styles.container_button}>
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>next</button>
          </div>
        </div>
      </section>
    </>
  )
}
