export const deleteItem = async (endpoint:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
  const data = await res.json()

  if (!res.ok) {
    if (res.status === 422) {
      throw new Error(data.errors[0].msg)
    } else {
      // Code for other errors
      console.log(res)
      console.log(data)
      throw new Error('Hubo un error al eliminar el objeto')
    }
  }
}