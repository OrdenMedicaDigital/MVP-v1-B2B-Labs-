"use client"
import { Button, Column, DatePicker, Heading, Input, Row, Select, Text } from "@/once-ui/components";
import Link from "next/link";
import { useOrderStore } from "../store/order";

export default function CreateOrderPage() {
    const {setData,patient} = useOrderStore();
    return (
        <Column fillWidth gap="24"  position="relative" paddingBottom="24">
            <Column fillWidth gap="16">
                <Heading as="h3">Datos del paciente:</Heading>
                <Input name="RUT" id="RUT" label="RUT del paciente:" onChange={(e)=>{
                    setData({patient:{...patient,rut:e.target.value,}})
                }} />
                <Input name="nombre" id="nombre" label="Nombre del paciente:" onChange={e=>{
                    setData({patient:{...patient,name:e.target.value}})
                }} />
                <Row gap="16">
                    <Input name="paterno" id="paterno" label="Apellido paterno del paciente:" />
                    <Input name="materno" id="materno" label="Apellido materno del paciente:" /> 
                </Row>
                <Text variant="body-default-s">Fecha de nacimiento:</Text>
               <Input type="date" name="fecha" id="fecha" label="" onChange={e=>{
                     setData({patient:{...patient,birthDate:e.target.value}})
               }} />
            </Column>
            <Link href="/create-order/contact" passHref>
                <Button fillWidth>Continuar</Button>
            </Link>
        </Column>
    )
} 