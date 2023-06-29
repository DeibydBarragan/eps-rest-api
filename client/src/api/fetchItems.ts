export const fetchItems = async (endpoint:string, limit:number = 7, page:number = 1) => {
  const res = await fetch(`http://localhost:3002/api/${endpoint}?limit=${limit}&page=${page}`)
  const data = await res.json()
  return data
}