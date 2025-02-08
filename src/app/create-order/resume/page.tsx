"use client";
import { useOrderStore } from "@/app/store/order";
import {
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Row,
  Card,
  Text,
} from "@/once-ui/components";

export default function ResumePage() {
  const { setData, patient, exams } = useOrderStore();

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
              <Text>Teléfono: 12345678</Text>
              <Text>Región: Metropolitana</Text>
              <Text>Comuna: Santiago</Text>
              <Text>Dirección: Calle Falsa 123</Text>
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
            src="/preview.pdf"
            width="100%"
            height="500px"
            style={{ borderRadius: "8px" }}
          ></iframe>
        </Card>
        <Row gap="16">
          <Button variant="secondary" href="/create-order/exam">
            Agregar examen
          </Button>
          <Button variant="primary">Descargar orden</Button>
        </Row>
      </Column>
    </Flex>
  );
}
