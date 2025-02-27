"use client";
import { useOrderStore } from "@/app/store/order";
import {
  Button,
  Column,
  Flex,
  Heading,
  IconButton,
  Row,
  Card,
  Text,
} from "@/once-ui/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


const dateToAge = (birtDate:Date)=>{
    const diff = Date.now() - birtDate.getTime();
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
}

export default function ResumePage() {
  const { setData, patient, exams } = useOrderStore();
  const [pdf,setPdf] = useState("");
  const router = useRouter()
  const {data} = useSession()

  const getPreview = async () => {
    const res = await fetch("/api/pdf/generate", {
      method: "POST",
      body: JSON.stringify({ data: {
        name: patient.name + " " + patient.paterno + " " + patient.materno,
        rut: patient.rut,
        age: dateToAge(new Date(patient.birthDate)) + " años",
        address: patient.address,
        comuna: patient.comuna.name,
        region: patient.region.name,
        date: new Date().toLocaleDateString(),
        exams
      }}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    setPdf(data.data.renderId)
  }

  useEffect(()=>{
    getPreview();
  },[])

  const handleSave = async () => {
    fetch("/api/order/save", {
        method: "POST",
        body: JSON.stringify({ patient, exams: exams, labId:data?.user.labId, date: new Date().toDateString() }),
        headers: {
          "Content-Type": "application/json",
        },
    }).then((data) => data.json()).then((data) => {
        if(data.error){
            alert(data.error);
        }else{
            alert(data.message);
            router.replace("/dashboard");
        }
    });
  }

  return (
    <Flex gap="24" fillWidth wrap>
      {/* Información del paciente */}
      <Column gap="24" fillWidth>
        <Heading as="h2">Resumen de la orden</Heading>
        <Card padding="24" background="surface" radius="l">
          <Column gap="24">
            <Heading as="h4">Datos del paciente</Heading>
            <Column gap="8">
              <Text>RUT: {patient.rut}</Text>
              <Text>Nombre: {patient.name}</Text>
                <Text>Apellido paterno: {patient.paterno}</Text>
                <Text>Apellido materno: {patient.materno}</Text>
              <Text>Fecha de nacimiento: {patient.birthDate}</Text>
            </Column>
          </Column>
        </Card>

        {/* Información de contacto */}
        <Card
          padding="24"
          background="surface"
          radius="l"
          title="Datos de contacto"
        >
          <Column gap="24">
            <Heading as="h4">Datos de contacto</Heading>
            <Column gap="8">
              <Text>
                Correo electrónico:{" "}
                <a href={`mailto:${patient.email}`}>{patient.email}</a>
              </Text>
              <Text>Teléfono: {patient.phone}</Text>
              <Text>Región: {patient.region.name}</Text>
              <Text>Comuna: {patient.comuna.name}</Text>
              <Text>Dirección: {patient.address}</Text>
            </Column>
          </Column>
        </Card>
      </Column>

      {/* Lista de exámenes */}
      <Column gap="24" fillWidth>
        <Heading as="h3">Exámenes solicitados</Heading>
        {exams.map((exam, index) => (
          <Card key={index} padding="16" background="surface" radius="m">
            <Row horizontal="space-between" vertical="center" fillWidth>
              <Column>
                <Heading as="h4">{exam.name}</Heading>
                <Text>{exam.description}</Text>
              </Column>
              <IconButton
                icon="trash"
                size="m"
                variant="danger"
                onClick={() =>
                  setData({ exams: exams.filter((_, i) => i !== index) })
                }
              />
            </Row>
          </Card>
        ))}
      </Column>

      {/* Vista previa y acciones */}
      <Column fillWidth gap="24">
        <Heading as="h3">Vista previa de la orden</Heading>
        <Card padding="16" background="surface" radius="m">
          <iframe
            src={`/api/pdf?pdf=${pdf}`}
            width="100%"
            height="500px"
            style={{ borderRadius: "8px" }}
          ></iframe>
        </Card>
        <Row gap="16">
          <Button variant="secondary" href="/dashboard/create-order/exam">
            Agregar examen
          </Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Row>
      </Column>
    </Flex>
  );
}
