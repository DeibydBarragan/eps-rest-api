export const getItemsBy = async (endpoint:string, category:string, equalTo:string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${category}=${equalTo}`
  console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok) {
    if (res.status === 500) {
      throw new Error(data.errors[0].msg)
    } else {
      // Code for other errors
      throw new Error('Hubo un error al obtener los objetos')
    }
  }
  return data
}