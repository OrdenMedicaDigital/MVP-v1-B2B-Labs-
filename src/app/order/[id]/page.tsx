import { getOrderById } from "@/db/queries";
import { Button, Card, Column, Flex, Heading, Icon, IconButton, Row, Text } from "@/once-ui/components";

//Generate a basic layout for the resume page, including, title, pacient, contact, and exam data, with a preview of the order in pdf.
//Add a button to add exams to the order, and other one for complete and download the order pdf.

export default async function OrderPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }){
    const id = Number((await params).id)
    const data = await getOrderById(id);
    const patient = data?.patient
    const exams = data?.exams

    return(
        <Flex gap="24" fillWidth wrap>
        {/* Información del paciente */}
        <Column gap="24" fillWidth>
          <Heading as="h2">Resumen de la orden</Heading>
          <Card padding="24" background="surface" radius="l">
            <Column gap="24">
              <Heading as="h4">Datos del paciente</Heading>
              <Column gap="8">
                <Text>RUT: {patient?.rut}</Text>
                <Text>Nombre: {patient?.name}</Text>
                  <Text>Apellido paterno: {patient?.paterno}</Text>
                  <Text>Apellido materno: {patient?.materno}</Text>
                <Text>Fecha de nacimiento: {patient?.birthDate}</Text>
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
                  <a href={`mailto:${patient?.email}`}>{patient?.email}</a>
                </Text>
                <Text>Teléfono: {patient?.phone}</Text>
                <Text>Región: {patient?.region}</Text>
                <Text>Comuna: {patient?.comuna}</Text>
                <Text>Dirección: {patient?.address}</Text>
              </Column>
            </Column>
          </Card>
        </Column>
  
        {/* Lista de exámenes */}
        <Column gap="24" fillWidth>
          <Heading as="h3">Exámenes solicitados</Heading>
          {exams?.map((exam, index) => (
            <Card key={index} padding="16" background="surface" radius="m">
              <Row horizontal="space-between" vertical="center" fillWidth>
                <Column>
                  <Heading as="h4">{exam.examName}</Heading>
                  <Text>{exam.description}</Text>
                </Column>
              </Row>
            </Card>
          ))}
        </Column>
  
        {/* Vista previa y acciones */}
        <Column fillWidth gap="24">
          <Heading as="h3">Vista previa de la orden</Heading>
          <Card padding="16" background="surface" radius="m">
            <iframe
              src="/preview.pdf"
              width="100%"
              height="500px"
              style={{ borderRadius: "8px" }}
            ></iframe>
          </Card>
          <Row gap="16">
          </Row>
        </Column>
      </Flex>
    )
}