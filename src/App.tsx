import LazyLoad from './components/LazyLoad'
import InfiniteScroll from './components/InfiniteScroll'
import Debounce from './components/Debounce'
import Throttle from './components/Throttle'
import FormValidation from './components/FormValidation'
import Skeleton from './components/Skeleton'

export default function App() {
  return (
    <div className='App'>
      <LazyLoad />
      <InfiniteScroll />
      <Debounce />
      <Throttle />
      <FormValidation />
      <Skeleton />
    </div>
  )
}
