"use client"
import { Button, Column, DatePicker, Heading, Input, Row, Select, Text } from "@/once-ui/components";
import Link from "next/link";
import { useOrderStore } from "@/app/store/order";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useLab from "@/hooks/useLab";
import { redirect } from "next/navigation";

export default function CreateOrderPage() {
    const {setData,patient} = useOrderStore();
    const lab = useLab();

    useEffect(()=>{
        if(lab?.type === "Prepago" && lab?.orders === 0){
            alert("No tienes ordenes disponibles")
            redirect("/checkout")
        }
    },[lab])

    const handleSearchPatient = async () => {
        fetch(`/api/patient/${patient.rut}`).then(res=>res.json()).then((data)=>{
            setData({patient:data})
        })
    }

    useEffect(()=>{
        handleSearchPatient()
    },[patient.rut])

    return (
        <Column fillWidth gap="24"  position="relative" paddingBottom="24">
            <Column fillWidth gap="16">
                <Heading as="h3">Datos del paciente:</Heading>
                <Input value={patient.rut} name="RUT" id="RUT" label="RUT del paciente:" onChange={(e)=>{
                    setData({patient:{...patient,rut:e.target.value,}})
                }} />
                <Input value={patient.name} name="nombre" id="nombre" label="Nombre del paciente:" onChange={e=>{
                    setData({patient:{...patient,name:e.target.value}})
                }} />
                <Row gap="16">
                    <Input value={patient.paterno} name="paterno" id="paterno" label="Apellido paterno:" onChange={e=>{
                        setData({patient:{...patient,paterno:e.target.value}})
                    }} />
                    <Input value={patient.materno} name="materno" id="materno" label="Apellido materno:" onChange={e=>{
                        setData({patient:{...patient,materno:e.target.value}})
                    }} /> 
                </Row>
                <Text variant="body-default-s">Fecha de nacimiento:</Text>
               <Input value={patient.birthDate} type="date" name="fecha" id="fecha" label="" onChange={e=>{
                     setData({patient:{...patient,birthDate:e.target.value}})
               }} />
            </Column>
            <Link href="/dashboard/create-order/contact" passHref>
                <Button fillWidth>Continuar</Button>
            </Link>
        </Column>
    )
} 