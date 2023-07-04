import useGetItems from '@/components/hooks/useGetItems'
import { Container, Loading, Row, Table, Text, Popover, Pagination, Button } from '@nextui-org/react'
import React from 'react'
import { MoreHorizontal, RotateCw } from 'lucide-react'

type Props = {}

export default function Appointments({}: Props) {
  // Pagination
  const [ appointments, loadingAppointments, pagination, actualPage, setActualPage, getAppointments, error ] = useGetItems('appointments')

  return (
    <Container
      display='flex'
      gap={10}
      direction='column'
      justify='space-between'
      css={{
        border: "1px solid $secondary",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px 0",
        minHeight: "80vh",
        position: "relative",
        '@xl': {
          width: "80%",
        },
      }}
    >
      <Row css={{ width: '100%', gap: '$5'}}>
        {appointments && (
          <Button auto icon={<RotateCw size={20}/>} onClick={() => getAppointments()}/>
        )}
      </Row>
      {loadingAppointments ? (
        <Loading size="xl"
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : error ? (
        <Text color="error" h3
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Error al cargar las citas...
        </Text>
      ) : appointments &&
      (<>
          <Table
            color="secondary"
            aria-label="Tabla de pacientes"
            css={{
              height: "auto",
              width: "100%",
            }}
          >
            
            <Table.Header>
              <Table.Column>Cedula paciente</Table.Column>
              <Table.Column>Cedula doctor</Table.Column>
              <Table.Column>Oficina</Table.Column>
              <Table.Column>Especialidad</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>
            <Table.Body>
              {appointments.map((appointment, index) => (
                <Table.Row key={`appointment${index}`}>
                  <Table.Cell>{appointment?.patient?.cedula}</Table.Cell>
                  <Table.Cell>{appointment?.doctor?.cedula}</Table.Cell>
                  <Table.Cell>{appointment?.office}</Table.Cell>
                  <Table.Cell>{appointment?.speciality}</Table.Cell>
                  <Table.Cell 
                    css={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      gap: "10px",
                    }}
                  >
                    <Popover isDismissable={false} placement='bottom-right'>
                      <Popover.Trigger>
                        <Button auto flat icon={<MoreHorizontal />}/>
                      </Popover.Trigger>
                      <Popover.Content css={{ zIndex: "200 !important" }}>
                        <Button>Eliminar</Button>
                      </Popover.Content>
                    </Popover>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Row justify='center' css={{width: "100%", mt: '$8'}}>
            <Pagination
              shadow
              noMargin
              total={pagination?.totalPages}
              page={actualPage}
              onChange={(page) => setActualPage(page)}
            />
          </Row>
        </>
        )}
      </Container>
  )
}