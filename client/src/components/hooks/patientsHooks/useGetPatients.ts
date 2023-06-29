import { getPatients } from '@/api/patients'
import { Patient } from '@/interfaces/interfaces'
import { useState, useEffect } from 'react'
import { Pagination } from './interfaces'

type UseGetPatientsResult = {
  patients: Patient[]
  loadingPatients: boolean
  error: Error | null
  pagination: Pagination | null
  actualPage: number
  setActualPage: React.Dispatch<React.SetStateAction<number>>
}

const useGetPatients = (limit:number = 7, page:number = 1): UseGetPatientsResult => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [actualPage, setActualPage] = useState(page)

  useEffect(() => {
    console.log(actualPage)
    getPatients(limit, actualPage)
      .then((data) => {
        setPatients(data.docs)
        setPagination(() => {
          const { docs, ...rest } = data
          return rest
        })
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => setLoadingPatients(false))
  }, [limit, actualPage])

  return { patients, loadingPatients, pagination, actualPage, setActualPage, error }
}

export default useGetPatients

