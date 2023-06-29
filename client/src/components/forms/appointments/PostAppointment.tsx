import { Button, Input, Loading, Modal, Text, useModal, Popover,  } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { postPatientSchema } from '../schemas/patients/postPatientSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPopover from '@/components/common/inputPopover/inputPopover'
import { insertPatient } from '@/api/InsertItem'
import { toast } from 'react-toastify'
import { Patient } from '@/interfaces/interfaces'
import { UserPlus } from 'lucide-react'

type Props = {
  patient: Patient
}

export default function PostAppointment({patient}: Props) {
  // Modal state
  const { visible, setVisible } = useModal()

  // Loading fetch state
  const [isLoading, setIsLoading] = useState(false)
  
  // Modal handlers
  const handler = () => setVisible(true)
  const closeHandler = () => setVisible(false)
  
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, clearErrors } = useForm({
    resolver: yupResolver(postPatientSchema),
  })
  
  // Reset the form when the modal is closed
  useEffect(() => {
    reset()
  }, [visible, reset])
  
  // Submit the form
  const onSubmit = async () => {
    console.log('submit')
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
            
            
          </Modal.Body>
          <Modal.Footer>
            {/**Cancel and submit buttons */}
            <Button auto flat color="error" onClick={closeHandler}>
              Cancelar
            </Button>
            <Button 
              auto
              type='submit' 
              color='secondary'
              iconRight={
                isLoading ? <Loading color='secondary' type='points' size='sm'/>
                : <UserPlus size={20}/>
              }
              disabled={isLoading}
            >
              Agendar cita
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}