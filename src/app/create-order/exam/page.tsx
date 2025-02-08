"use client"
import { useOrderStore } from "@/app/store/order";
import { Button, Checkbox, Column, Heading, Icon, Input, Row, Text } from "@/once-ui/components";
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
            <Row vertical="center"  horizontal="space-between">
                <Button onClick={()=>router.back()}>
                    <Row gap="8">
                    <Icon name="go-back" size="s" />
                    Regresar
                    </Row>
                </Button>
            <Button variant="tertiary" >Añadir examen</Button>
            <Button onClick={()=>router.push("/create-order/resume")}>
                <Row gap="8">
                    <Icon name="save" size="s" />
                    Guardar
                    </Row>
                </Button>
            </Row>
            <Input id="search" label="Buscar por examen o procedimiento" />
            <Heading variant="body-strong-s">Busquedas populares</Heading>
            <Column gap="8">
                {examsData.map((exam, index) => {
                    return (
                        <Checkbox
                        label={exam.name}
                        description={exam.description}
                        isChecked={exams.some((item) => item.name === exam.name)}
                        onToggle={()=>{
                            setData({exams:exams.some((item) => item.name === exam.name) ? exams.filter((item) => item.name !== exam.name) : [...exams, exam]})
                        }}
                        />
                    )
                })}
            </Column>
        </Column>
    )
}