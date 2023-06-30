export const getItemsBy = async (endpoint:string, category:string, equalTo:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${category}=${equalTo}`)
  const data = await res.json()
  return data
}