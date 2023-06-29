import PostPatient from '@/components/forms/patients/PostPatient'
import useGetPatients from '@/components/hooks/patientsHooks/useGetPatients'
import { IconButton } from '@/components/common/styled/IconButton'
import { Container, Loading, Row, Table, Text, Tooltip, Pagination } from '@nextui-org/react'
import React from 'react'
import { HiOutlinePlus } from 'react-icons/hi'

type Props = {}

export default function Patients({}: Props) {
  // Pagination
  const { patients, loadingPatients, pagination, actualPage, setActualPage, error } = useGetPatients()

  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid #eaeaea",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px 0",
        minHeight: "70vh",
        gap: "1rem",
        position: "relative",
        '@xl': {
          width: "80%",
        },
      }}
    >
      <Row>
        <PostPatient />
      </Row>
      {loadingPatients ? (
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
          Error al cargar los pacientes...
        </Text>
      ) : patients &&
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
              <Table.Column>Nombre</Table.Column>
              <Table.Column>Apellido</Table.Column>
              <Table.Column>Cédula</Table.Column>
              <Table.Column>Edad</Table.Column>
              <Table.Column>Correo electrónico</Table.Column>
              <Table.Column>Télefono</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>
            <Table.Body>
              {patients?.map((patient, index) => (
                <Table.Row key={`patient${index}`}>
                  <Table.Cell>{patient.name}</Table.Cell>
                  <Table.Cell>{patient.lastname}</Table.Cell>
                  <Table.Cell>{patient.cedula}</Table.Cell>
                  <Table.Cell>{patient.age}</Table.Cell>
                  <Table.Cell>{patient.email}</Table.Cell>
                  <Table.Cell>{patient.phone}</Table.Cell>
                  <Table.Cell 
                    css={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      gap: "10px",
                    }}
                  >
                    <Tooltip content="Agendar cita">
                      <IconButton>
                        <HiOutlinePlus size={20} fill='#979797' />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination
            shadow
            noMargin
            total={pagination?.totalPages}
            page={actualPage}
            onChange={(page) => setActualPage(page)}
          />
        </>
        )}
      </Container>
  )
}