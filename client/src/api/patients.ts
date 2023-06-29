import { Patient } from "@/components/hooks/patientsHooks/interfaces"

export const getPatients = async (limit:number = 7, page:number = 1) => {
  const res = await fetch(`http://localhost:3002/api/patients?limit=${limit}&page=${page}`)
  const data = await res.json()
  return data
}

export const insertPatient = async (patient: Patient) => {
    const res = await fetch(`http://localhost:3002/api/patients`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
    const data = await res.json()

    if (!res.ok) {
      if (res.status === 422) {
        throw new Error(data.errors[0].msg)
      } else {
        // Code for other errors
        throw new Error('Hubo un error al guardar el paciente')
      }
    }
}