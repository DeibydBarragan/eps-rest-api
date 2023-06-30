export const fetchItems = async (endpoint:string, limit:number = 7, page:number = 1) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?limit=${limit}&page=${page}`)
  const data = await res.json()
  return data
}