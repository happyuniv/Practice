import { useEffect, useState } from 'react'
import styles from './LazyLoad.module.css'

const UNSPLASH_KEY =
  'b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd'

export default function LazyLoad() {
  const [photos, setPhotos] = useState<{ urls: { regular: string } }[]>([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_KEY}&count=10`
      )
      const data = await res.json()
      setPhotos(data)
    }
    getData()
  }, [])

  return (
    <>
      <section>
        <h1>Lazy Load</h1>
        <div className={styles.container}>
          {photos.map((photo) => (
            <img src={photo.urls.regular} loading='lazy' alt='' />
          ))}
        </div>
      </section>
    </>
  )
}
