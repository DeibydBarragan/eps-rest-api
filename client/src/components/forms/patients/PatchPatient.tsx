import { Button, Input, Loading, Modal, Text, useModal, Popover } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { filterPropertiesWithValues, isEmptyObject } from '@/utils/utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPopover from '@/components/common/inputPopover/inputPopover'
import { toast } from 'react-toastify'
import { patchItem } from '@/api/patchItem'
import { Pencil } from 'lucide-react';
import { Patient } from '@/interfaces/interfaces'
import { patchPatientSchema } from '../schemas/patients/patchPatientSchema'

type Props = {
  patient: Patient
  reload: () => void
}

export default function PatchPatient({ patient, reload }: Props) {
  // Modal state
  const { visible, setVisible } = useModal()

  // Loading fetch state
  const [isLoading, setIsLoading] = useState(false)
  
  // Modal handlers
  const handler = () => setVisible(true)
  const closeHandler = () => setVisible(false)
  
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(patchPatientSchema),
  })
  
  // Reset the form when the modal is closed
  useEffect(() => {
    reset()
  }, [visible, reset])
  
  // Submit the form
  const onSubmit = async (formData: any) => { 
    const data = filterPropertiesWithValues(formData)
    
    if (isEmptyObject(data)) {
      toast.warning('Debe diligenciar algún campo')
      return
    }

    try {
      setIsLoading(true)
      await patchItem('patients', data, patient?._id)
      toast.success('El paciente fue actualizado correctamente')
      closeHandler()
    } catch(err) {
      let msg = 'Hubo un error al actualizar el paciente'
      if (err instanceof Error) {
        if (err.message === 'Cedula already in use') msg = 'La cedula ya está en uso por otro paciente'
        if (err.message === 'Email already in use') msg = 'El email ya está en uso por otro paciente'
      }
      toast.error(msg)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button flat onPress={handler} iconRight={<Pencil size={20} />}>
        Editar paciente
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
            Editar paciente
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text h5>
            Datos básicos
          </Text>
          {/**Nombre */}
          <InputPopover error={errors.name}>
            <Input
              clearable
              bordered
              fullWidth
              color="secondary"
              labelLeft="Nombre"
              aria-label='Nombre'
              placeholder={patient?.name}
              type='text'
              {...register('name')}
            />
          </InputPopover>
          
          {/**Lastname */}
          <InputPopover error={errors.lastname}>
              <Input
                clearable
                bordered
                fullWidth
                color="secondary"
                labelLeft="Apellido"
                aria-label='Apellido'
                placeholder={patient?.lastname}
                type='text'
                {...register('lastname')}
              />
          </InputPopover>

          {/**Cedula */}
          <InputPopover error={errors.cedula}>
            <Input
              bordered
              fullWidth
              type='number'
              color="secondary"
              labelLeft="Cédula"
              aria-label='Cédula'
              placeholder={patient?.cedula.toString()}
              {...register('cedula')}
            />
          </InputPopover>
          
          {/**Age */}
          <InputPopover error={errors.age}>
            <Input
              bordered
              fullWidth
              color="secondary"
              labelLeft="Edad"
              aria-label='Edad'
              placeholder={patient?.age.toString()}
              type='number'
              {...register('age')}
            />
          </InputPopover>

          <Text h5>
            Datos de contacto
          </Text>

          {/**Phone */}
          <InputPopover error={errors.phone}>
            <Input
              bordered
              fullWidth
              color="secondary"
              labelLeft="Teléfono"
              aria-label='Teléfono'
              placeholder={patient?.phone.toString()}
              type='number'
              {...register('phone')}
            />
          </InputPopover>

          {/**Email */}
          <InputPopover error={errors.email}>
            <Input
              clearable
              bordered
              fullWidth
              color="secondary"
              labelLeft="Correo electrónico"
              aria-label='Correo electrónico'
              placeholder={patient?.email}
              type='text'
              {...register('email')}
            />
          </InputPopover>
          
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
              : <Pencil size={20}/>
            }
            disabled={isLoading}
          >
            Actualizar paciente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}