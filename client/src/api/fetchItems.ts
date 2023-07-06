export const fetchItems = async (endpoint:string, limit:number = 7, page:number = 1) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}limit=${limit}&page=${page}`
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok) {
    if (res.status === 500) {
      throw new Error(data.error)
    } else {
      // Code for other errors
      throw new Error('Hubo un error al obtener los objetos')
    }
  }
  return data
}