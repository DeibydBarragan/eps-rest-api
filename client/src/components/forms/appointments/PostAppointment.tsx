import { Button, Input, Loading, Modal, Text, useModal, Popover, Row,  } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Doctor, Patient, Speciality } from '@/interfaces/interfaces'
import { ChevronDown, FolderPlus } from 'lucide-react'
import { specialities } from '@/constants/constants'
import { insertItem } from '@/api/InsertItem'
import { getItemsBy } from '@/api/getItemsBy'
import moment from 'moment'
import { postAppointmentsSchema } from '../schemas/appointments/postAppointmentSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import InputPopover from '@/components/common/inputPopover/inputPopover'

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
  const [speciality, setSpeciality] = useState<string | null>(null)

  // Doctor state
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  // Form button disabled
  const [disabled, setDisabled] = useState(true)

  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(postAppointmentsSchema),
  })

  useEffect(() => {
    reset()
    setSpeciality(null)
  }, [visible, reset])

  useEffect(() => {
    if (speciality) {
      setDoctor(null)
      setDoctors(null)
      setIsLoadingDoctors(true)
      getItemsBy('allDoctors', 'speciality', `${speciality}`)
      .then((doctors) => {
        setDoctors(doctors)
      })
      .catch(() => {
        toast.error(`Hubo un error al obtener los doctores de la especialidad ${specialities[parseInt(speciality)]}`)
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
    try {
      const response = await insertItem('appointments', {
        patientId: patient?._id,
        doctorId: doctor?._id,
        hour: formData.hour,
        date
      })
      toast.success('Cita añadida correctamente')
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
          onPress={handler}
          iconRight={<FolderPlus size={20} />}  
        >
          Agendar cita
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
              value={patient?.name}
              readOnly
            />
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Apellido"
              aria-label='Apellido'
              type='text'
              value={patient?.lastname}
              readOnly
            />
            <Input 
              bordered
              fullWidth
              color="secondary"
              labelLeft="Cédula"
              aria-label='Cedula'
              type='text'
              value={patient?.cedula}
              readOnly
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
                labelLeft="Fecha"
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
                labelLeft="Hora"
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
                : <FolderPlus size={20}/>
              }
              disabled={isLoading || disabled}
              type='submit'
            >
              Agendar cita
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}