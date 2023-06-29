import { Row } from '@nextui-org/react'
import React, { useState } from 'react'
import Patients from '../sections/patients/Patients'
import Nav from '@/components/nav/Nav'

export default function Layout() {
  const [section, setSection] = useState("appointments")

  return (
    <>
      <Nav setSection={setSection} section={section}/>

      <Row
        css={{
          minHeight: "80vh",
          alignItems: "center",
          width: "100%",
          padding: "0 0.5rem",
          justifyContent: "center",
        }}
      >
        {section === "patients" && (<Patients />)}      
      </Row>
    </>
  )
}