import { useNews } from '../context/NewsContext'

const useNewsHook = () => {
  return useNews()
}

export default useNewsHook