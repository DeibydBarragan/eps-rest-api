import { Button, Input, Loading, Modal, Text, useModal, Popover, Row,  } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Doctor, Patient, Speciality } from '@/interfaces/interfaces'
import { UserPlus, ChevronDown } from 'lucide-react'
import { specialities } from '@/constants/constants'
import { insertItem } from '@/api/InsertItem'
import { getItemsBy } from '@/api/getItemsBy'

type Props = {
  patient: Patient
}

export default function PostAppointment({patient}: Props) {
  // Modal state
  const { visible, setVisible } = useModal()

  // Modal handlers
  const handler = () => setVisible(true)
  const closeHandler = () => setVisible(false)

  // Loading fetch state
  const [isLoading, setIsLoading] = useState(false)

  // Fetching doctors
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false)

  const [doctors, setDoctors] = useState<Doctor[] | null>(null)
  
  // Speciality and doctor form state
  const [speciality, setSpeciality] = useState<Speciality | null>(null)

  const [doctor, setDoctor] = useState<Doctor | null>(null)

  // Form button disabled
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (speciality) {
      setDoctor(null)
      setDoctors(null)
      setIsLoadingDoctors(true)
      getItemsBy('allDoctors', 'speciality', speciality as string)
      .then((doctors) => {
        setDoctors(doctors)
      })
      .catch(() => {
        toast.error(`Hubo un error al obtener los doctores de la especialidad ${speciality}`)
      })
      .finally(() => {
        setIsLoadingDoctors(false)
      })
    }
  }, [speciality])

  useEffect(() => {
    if (doctor) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [doctor])
  
  // Submit the form
  const onSubmit = async () => {
    if (!doctor) return
    setIsLoading(true)
    try {
      const response = await insertItem('appointments', {
        patientId: patient._id,
        doctorId: doctor._id,
      })
      toast.success('Cita añadida correctamente')
      console.log(response)
    } catch (err) {
      console.log(err)
      let msg = 'Hubo un error al guardar la cita'
      if (err instanceof Error) {
        if(err.message === 'Patient does not exist') msg = 'El paciente no existe'
        if(err.message === 'Doctor does not exist') msg = 'El paciente no existe'
      }
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <>
        <Button onPress={handler}>
          Agendar cita
        </Button>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          blur
        >
          <Modal.Header>
            <Text id="modal-title" h4>
              Agendar cita
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text h5>
              Datos del paciente
            </Text>
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Nombre"
              aria-label='Nombre'
              type='text'
              value={patient.name}
              readOnly
            />
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Apellido"
              aria-label='Apellido'
              type='text'
              value={patient.lastname}
              readOnly
            />
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Cédula"
              aria-label='Cedula'
              type='text'
              value={patient.cedula}
              readOnly
            />

            {/**Specialities */}
            <Popover shouldFlip={false} placement='bottom-right'>
              <Popover.Trigger>
                <Button flat color="secondary" iconRight={<ChevronDown size={25}/>}>
                    {speciality ? speciality : 'Seleccionar especialidad'}
                </Button>
              </Popover.Trigger>
              <Popover.Content css={{p: '$4'}}>
                <Row css={{gap: '$4', flexDirection: 'column'}}>
                  {specialities.map((speciality) => (
                    <Button
                      key={speciality}
                      flat
                      size='md'
                      onClick={() => setSpeciality(speciality)}
                    >
                      {speciality}
                    </Button>
                  ))}
                </Row>
              </Popover.Content>
            </Popover>

            {/**Doctor */}
            <Popover shouldFlip={false} placement='bottom-right'>
              <Popover.Trigger>
                <Button 
                  flat color="secondary" disabled={doctors ? false : true}
                  iconRight={isLoadingDoctors ? <Loading color='secondary' type='points' size='sm'/> : <ChevronDown size={25}/>}
                >
                  {doctor ? `${doctor.name} ${doctor.lastname}` : 'Seleccione un doctor'}
                </Button>
              </Popover.Trigger>
              <Popover.Content css={{p: '$4'}}>
                <Row css={{gap: '$4', flexDirection: 'column'}}>
                  {doctors && doctors.map((doctor) => (
                    <Button 
                      key={doctor._id}
                      flat
                      size='md'
                      onClick={() => setDoctor(doctor)}
                    >
                      {`${doctor.name} ${doctor.lastname}`}
                    </Button>
                  ))}
                </Row>
              </Popover.Content>
            </Popover>
          </Modal.Body>
          <Modal.Footer>
            {/**Cancel and submit buttons */}
            <Button auto flat color="error" onClick={closeHandler}>
              Cancelar
            </Button>
            <Button 
              auto
              color='secondary'
              iconRight={
                isLoading ? <Loading color='secondary' type='points' size='sm'/>
                : <UserPlus size={20}/>
              }
              disabled={isLoading || disabled}
              onClick={onSubmit}
            >
              Agendar cita
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}