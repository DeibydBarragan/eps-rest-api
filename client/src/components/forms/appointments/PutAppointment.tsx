import { Button, Input, Loading, Modal, Text, useModal, Popover, Row,  } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Doctor, Patient, Speciality } from '@/interfaces/interfaces'
import { ChevronDown, Pencil } from 'lucide-react'
import { specialities } from '@/constants/constants'
import { getItemsBy } from '@/api/getItemsBy'
import moment from 'moment'
import { postAppointmentsSchema } from '../schemas/appointments/postAppointmentSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import InputPopover from '@/components/common/inputPopover/inputPopover'
import { putItem } from '@/api/putItem'

interface Appointment {
  _id: string
  patient: Patient
  doctor: Doctor
  date: Date
  office: number
  speciality: Speciality
}

type Props = {
  appointment: Appointment
  reload: () => void
}

export default function PutAppointment({appointment, reload}: Props) {
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
  const [speciality, setSpeciality] = useState<string>(specialities.indexOf(appointment?.speciality).toString())

  // Doctor state
  const [doctor, setDoctor] = useState<Doctor |null>(null)

  // Form button disabled
  const [disabled, setDisabled] = useState(true)

  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(postAppointmentsSchema),
  })

  useEffect(() => {
    reset()
  }, [visible, reset])

  useEffect(() => {
    if (speciality) {
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
  const onSubmit = async (formData: any) => {
    if (!doctor) return
    setIsLoading(true)
    const date = moment(formData.date).format('YYYY-MM-DD')
    console.log(formData.hour)
    try {
      const response = await putItem('appointments', {
        patientId: appointment?.patient?._id,
        doctorId: doctor?._id,
        hour: formData.hour,
        date
      }, appointment?._id)
      reload()
      toast.success('Cita editada correctamente')
    } catch (err) {
      let msg = 'Hubo un error al guardar la cita'
      if (err instanceof Error) {
        if(err.message === 'Date must not be a Sunday') msg = 'El día no debe ser un domingo'
        if(err.message === 'Doctor is not available on that date') msg = 'El doctor no está disponible en esa fecha'
        if(err.message === 'Doctor already has an appointment at that time') msg = 'El doctor ya tiene una cita en esa fecha y hora'
        if(err.message === 'Patient already has an appointment at that time') msg = 'El paciente ya tiene una cita en esa fecha y hora'
      }
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <>
        <Button
          flat
          onPress={handler}
          iconRight={<Pencil size={20} />}  
        >
          Editar cita
        </Button>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          blur
          as='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Header>
            <Text id="modal-title" h4>
              Editar cita
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
              value={appointment?.patient?.name}
              readOnly
            />
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Apellido"
              aria-label='Apellido'
              type='text'
              value={appointment?.patient?.lastname}
              readOnly
            />
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Cédula"
              aria-label='Cedula'
              type='text'
              value={appointment?.patient?.cedula}
              readOnly
            />
            <Input
              bordered
              fullWidth
              color="secondary"
              labelLeft="Fecha anterior"
              readOnly
              aria-label='Fecha anterior'
              type='date'
              value={moment(appointment?.date).format('YYYY-MM-DD')}
            />
            <Input
              bordered
              fullWidth
              color="secondary"
              labelLeft="Hora anterior"
              aria-label='Hora anterior'
              type='time'
              readOnly
              value={moment(appointment?.date).format('HH:mm')}
            />

            {/**Specialities */}
            <Popover shouldFlip={false} placement='bottom-right'>
              <Popover.Trigger>
                
                <Button type='button' flat color="secondary" iconRight={<ChevronDown size={25}/>}>
                    {speciality ? specialities[parseInt(speciality)] : 'Seleccionar especialidad'}
                </Button>
              </Popover.Trigger>
              <Popover.Content css={{p: '$4'}}>
                <Row css={{gap: '$4', flexDirection: 'column'}}>
                  {specialities.map((speciality, index) => (
                    <Button
                      type='button'
                      key={speciality}
                      flat
                      size='md'
                      onClick={() => setSpeciality(index.toString())}
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
                  flat color="secondary" disabled={doctors ? false : true} type='button'
                  iconRight={isLoadingDoctors ? <Loading color='secondary' type='points' size='sm'/> : <ChevronDown size={25}/>}
                >
                  {doctor ? `${doctor?.name} ${doctor?.lastname}` : 'Seleccione un doctor'}
                </Button>
              </Popover.Trigger>
              <Popover.Content css={{p: '$4'}}>
                <Row css={{gap: '$4', flexDirection: 'column'}}>
                  {doctors && doctors.map((doctor) => (
                    <Button 
                      key={doctor?._id}
                      flat
                      type='button'
                      size='md'
                      onClick={() => setDoctor(doctor)}
                    >
                      {`${doctor?.name} ${doctor?.lastname}`}
                    </Button>
                  ))}
                </Row>
              </Popover.Content>
            </Popover>

            {/**Date */}
            <InputPopover error={errors.date}>
              <Input
                bordered
                fullWidth
                color="secondary"
                labelLeft="Nueva fecha"
                aria-label='Fecha'
                type='date'
                min={moment().add(1, 'day').format('YYYY-MM-DD')}
                max={moment().add(6, 'month').format('YYYY-MM-DD')}
                {...register('date')}
              />
            </InputPopover>

            {/**Hour */}
            <InputPopover error={errors.hour}>
              <Input
                bordered
                fullWidth
                color="secondary"
                labelLeft="Nueva hora"
                aria-label='Hora'
                type='time'
                {...register('hour')}
              />
            </InputPopover>

          </Modal.Body>
          <Modal.Footer>
            {/**Cancel and submit buttons */}
            <Button auto flat color="error" onClick={closeHandler} type='button'>
              Cancelar
            </Button>
            <Button 
              auto
              color='secondary'
              iconRight={
                isLoading ? <Loading color='secondary' type='points' size='sm'/>
                : <Pencil size={20}/>
              }
              disabled={isLoading || disabled}
              type='submit'
            >
              Editar cita
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}