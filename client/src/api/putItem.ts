import { Endpoint } from "./types"

export const putItem = async (endpoint: Endpoint, item: object, id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  const data = await res.json()
  console.log(res)
  console.log(data)

  if (!res.ok) {
    if (res.status === 422) {
      throw new Error(data.errors[0].msg)
    } else {
      // Code for other errors
      throw new Error('Hubo un error al actualizar el objeto')
    }
  }
}