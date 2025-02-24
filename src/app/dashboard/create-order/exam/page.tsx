"use client";
import { useOrderStore } from "@/app/store/order";
import { getAllExams } from "@/db/queries";
import {
  Button,
  Checkbox,
  Column,
  Dialog,
  Heading,
  Icon,
  Input,
  Row,
  Text,
} from "@/once-ui/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamPage() {
  const { setData, exams } = useOrderStore();
  const [examsData, setExamsData] = useState<typeof exams>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addingExam,setAddingExam] = useState<boolean>(false);
  const [examData,setExamData] = useState<{code:string,name:string,description:string}>({code:"",name:"",description:""});
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("/api/exams")
      .then((data) =>data.json()).then((data) => {
        setExamsData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateExam = () => {
    fetch("/api/exams", {
      method: "POST",
      body: JSON.stringify(examData),
    })
      .then((data) => data.json())
      .then((data) => {
        setExamsData([...examsData, data]);
        setAddingExam(false);
      }).finally(()=>{
        alert("Examen creado correctamente")
      })
  }

  return (
    <Column fillWidth gap="16">
      <Row vertical="center" horizontal="space-between">
        <Button onClick={() => router.back()}>
          <Row gap="8">
            <Icon name="go-back" size="s" />
            Regresar
          </Row>
        </Button>
        <Button variant="tertiary">Añadir examen</Button>
        <Button onClick={() => router.push("/dashboard/create-order/resume")}>
          <Row gap="8">
            <Icon name="save" size="s" />
            Guardar
          </Row>
        </Button>
      </Row>
      <Input onChange={e=>{
        fetch("/api/exams").then(data=>data.json()).then(data=>{
          if(e.target.value === "") return setExamsData(data);
          setExamsData(data.filter((item:{name:string})=>item.name.toLowerCase().includes(e.target.value)))
        })
      }} id="search" label="Buscar por examen o procedimiento" />
      {loading && <Text>Cargando...</Text>}
      {!loading && examsData.length === 0 && (
        <Text>No hay examenes disponibles</Text>
      )}
      {!loading && examsData.length > 0 && (
        <>
          <Heading variant="body-strong-s">Busquedas populares</Heading>
          <Column gap="8">
            {examsData.map((exam, index) => {
              return (
                <Checkbox
                key={index}
                  label={exam.name}
                  description={exam.description}
                  isChecked={exams.some((item) => item.name === exam.name)}
                  onToggle={() => {
                    setData({
                      exams: exams.some((item) => item.name === exam.name)
                        ? exams.filter((item) => item.name !== exam.name)
                        : [...exams, exam],
                    });
                  }}
                />
              );
            })}
          </Column>
        </>
      )}
      <Dialog title="Añadir examen" isOpen={addingExam} onClose={()=>setAddingExam(false)}>
        <Column gap="16">
        <Input id="code" label="Código"  onChange={(e)=>{
          setExamData({...examData,code:e.target.value})
        }}/>
        <Input id="name" label="Nombre" onChange={e=>{
          setExamData({...examData,name:e.target.value})
        }} />
        <Input id="description" label="Descripción" onChange={e=>{
          setExamData({...examData,description:e.target.value})
        }} />
        <Button variant="tertiary" onClick={handleCreateExam}>Guardar</Button>
         </Column>
      </Dialog>
    </Column>
  );
}
