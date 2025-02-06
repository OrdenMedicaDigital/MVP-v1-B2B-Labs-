"use client"
import { useOrderStore } from "@/app/store/order";
import { Button, Column, Heading, Icon, Input, Row, Text } from "@/once-ui/components";
import { useRouter } from "next/navigation";


const examsData = [
    {
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


export default function ExamPage(){
    const {setData,exams} = useOrderStore()
    const router = useRouter()
    return (
        <Column fillWidth gap="16">
            <Row vertical="center" horizontal="center">
            <Button variant="tertiary" >Añadir examen</Button>
            </Row>
            <Input id="search" label="Buscar por examen o procedimiento" />
            <Heading variant="body-strong-s">Busquedas populares</Heading>
            <Column gap="8">
                {examsData.map((exam, index) => {
                    return (
                        <Row cursor="pointer" onClick={()=>{
                            setData({exams:[examsData[index]]})
                            router.push("/create-order/resume")
                        }} key={index} gap="8" padding="16" background="surface" radius="m">
                            <Column fillWidth>
                                <Heading as="h3" variant="body-default-m">{exam.name}</Heading>
                                <Text variant="body-default-s">{exam.description}</Text>
                            </Column>
                            <Icon name="chevron-right" />
                        </Row>
                    )
                })}
            </Column>
        </Column>
    )
}