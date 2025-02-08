"use client"
import { useOrderStore } from "@/app/store/order";
import { Button, Column, Flex, Heading, Icon, IconButton, Row } from "@/once-ui/components";

//Generate a basic layout for the resume page, including, title, pacient, contact, and exam data, with a preview of the order in pdf.
//Add a button to add exams to the order, and other one for complete and download the order pdf.

const exams = [{
    name: "Ecografía",
    code: "2002123",
    description: "Ecografía de abdomen",
},
{
    name: "Radiografía",
    code: "20022124",
    description: "Radiografía de torax",
},
]

export default function OrderPage(){
    return(
        <Flex gap="16" fillWidth wrap>
        <Column gap="16">
            <Heading as="h3">Resumen de la orden</Heading>
            <Column gap="16">
                <Heading as="h4">Datos del paciente:</Heading>
                <Column gap="8">
                    <p>RUT: 232012</p>
                    <p>Nombre: Juan Perez</p>
                    <p>Fecha de nacimiento: 21/03/04</p>
                </Column>
            </Column>
            <Column gap="16">
                <Heading as="h4">Datos de contacto:</Heading>
                <Column gap="8">
                    <p>Correo electrónico:
                        <a href="mailto:" >example@gmail.com</a>
                    </p>
                    <p>Teléfono: 12345678</p>
                    <p>Región: Metropolitana</p>
                    <p>Comuna: Santiago</p>
                    <p>Dirección: Calle Falsa 123</p>
                </Column>
            </Column>
            <Column gap="16">
                {exams.map((exam, index) => {
                    return (
                        <Row key={index} gap="8" padding="16" background="surface" radius="m">
                            <Column fillWidth>
                                <Heading as="h3">{exam.name}</Heading>
                                <p>{exam.description}</p>
                            </Column>
                        </Row>
                    )
                }
                )}
            </Column>

        </Column>
        <Column fillWidth gap="16" >
            <Heading as="h3">Vista previa de la orden</Heading>
            <iframe src="/preview.pdf" width="100%" height="500px"></iframe>
            <Row gap="16">
                <Button variant="secondary" href="/create-order/exam">Agregar examen</Button>
                <Button>Descargar orden</Button>
            </Row>
        </Column>
        </Flex>
    )
}