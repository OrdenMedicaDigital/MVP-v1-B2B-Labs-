"use client";
import {
  Button,
  Card,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Row,
  Select,
  Skeleton,
  Text,
} from "@/once-ui/components";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const params = useParams();
  const [details, setDetails] = useState<{
    patient: {
      name: string;
      paterno: string;
      materno: string;
      rut: string;
      birthDate: string;
      email: string;
      phone: string;
      region: string;
      comuna: string;
      address: string;
    };
    exams: {
      examName: string;
      description: string;
      examCode: string;
    }[];
    state: string;
  } | null>(null);
  const id = params.id;

  useEffect(() => {
    fetch(`/api/order/${id}`)
      .then((data) => data.json())
      .then((data) => setDetails(data));
  }, []);

  const [pdf, setPdf] = useState("");
  const getPreview = async () => {
    if (!details?.patient || !details.exams) return;
    const patient = details.patient;
    const exams = details.exams.map((exam)=>{
      return {
        name: exam.examName,
        description: exam.description,
        code: exam.examCode
      }
    });
    const res = await fetch("/api/pdf/generate", {
      method: "POST",
      body: JSON.stringify({
        data: {
          name: patient.name + " " + patient.paterno + " " + patient.materno,
          rut: patient.rut,
          age: patient.birthDate,
          address: patient.address,
          comuna: patient.comuna,
          region: patient.region,
          date: new Date().toLocaleDateString(),
          exams,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setPdf(data.data.renderId);
  };

  useEffect(() => {
    getPreview();
  }, [details]);

  return (
    <Flex gap="24" fillWidth fillHeight wrap>
      {details === null ? (
        <Flex height="l" fillHeight fillWidth overflow="hidden" radius="m">

        <Skeleton shape="block" fill radius="m"></Skeleton>
        </Flex>
      ) : (
        <>
          <Column gap="24" fillWidth>
          <Row gap="24" vertical="center" horizontal="space-between">
            <Heading as="h2">Resumen de la orden</Heading>
            <Select onSelect={(val)=>{
              fetch(`/api/order/${id}`,{
                method: "PATCH",
                body: JSON.stringify({
                  state: val
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(()=>{
                setDetails({
                  ...details,
                  state: val
                });
              });
            }} value={details.state === "pending" ? "Pendiente" : details.state === "processing" ? "En proceso" : "Completado"} id="state" label="Estado" options={[{
              label: "Pendiente",
              value: "pending"
            },{
              label: "En proceso",
              value: "processing"
            },{
              label: "Finalizada",
              value: "finished"
            }]} />
            </Row>
            <Card padding="24" background="surface" radius="l">
              <Column gap="24">
                <Heading as="h4">Datos del paciente</Heading>
                <Column gap="8">
                  <Text>RUT: {details?.patient?.rut}</Text>
                  <Text>Nombre: {details?.patient?.name}</Text>
                  <Text>Apellido paterno: {details?.patient?.paterno}</Text>
                  <Text>Apellido materno: {details?.patient?.materno}</Text>
                  <Text>
                    Fecha de nacimiento: {details?.patient?.birthDate}
                  </Text>
                </Column>
              </Column>
            </Card>
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
                    <a href={`mailto:${details?.patient?.email}`}>
                      {details?.patient?.email}
                    </a>
                  </Text>
                  <Text>Teléfono: {details?.patient?.phone}</Text>
                  <Text>Región: {details?.patient?.region}</Text>
                  <Text>Comuna: {details?.patient?.comuna}</Text>
                  <Text>Dirección: {details?.patient?.address}</Text>
                </Column>
              </Column>
            </Card>
          </Column>
          <Column gap="24" fillWidth>
            <Heading as="h3">Exámenes solicitados</Heading>
            {details?.exams?.map((exam, index) => (
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
            <Row gap="16"></Row>
          </Column>
        </>
      )}
    </Flex>
  );
}
