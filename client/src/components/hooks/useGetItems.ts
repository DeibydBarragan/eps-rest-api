import { fetchItems } from '@/api/fetchItems'
import { Pagination } from '@/interfaces/interfaces'
import { useState, useEffect, useCallback } from 'react'

type UseGetItemsResult = [
  items: any[],
  loadingItems: boolean,
  pagination: Pagination | null,
  actualPage: number,
  setActualPage: React.Dispatch<React.SetStateAction<number>>,
  getItems: () => void,
  error: Error | null
]

const useGetItems = (endpoint: string, limit: number = 7, page: number = 1): UseGetItemsResult => {
  const [items, setItems] = useState<any[]>([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [actualPage, setActualPage] = useState(page)

  
  const getItems = useCallback(() => {
    setLoadingItems(true)
    fetchItems(endpoint, limit, actualPage)
    .then((data) => {
      setItems(data.docs)
      setPagination(() => {
        const { docs, ...rest } = data
        return rest
      })
    })
    .catch((error) => {
      setError(error)
      console.log(error)
    })
    .finally(() => setLoadingItems(false))
  }, [endpoint, limit, actualPage])

  useEffect(() => {
    getItems()
  }, [getItems])

  return [items, loadingItems, pagination, actualPage, setActualPage, getItems, error]
}

export default useGetItems

