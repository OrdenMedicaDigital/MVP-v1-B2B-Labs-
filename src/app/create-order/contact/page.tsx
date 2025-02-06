"use client"
import { useOrderStore } from "@/app/store/order";
import { Button, Column, Heading, Input, Row, Select } from "@/once-ui/components";
import Link from "next/link";

export default function ContactPage() {
  const {setData,patient} = useOrderStore()
  return (
    <Column fillWidth gap="16">
      <Heading as="h3">Datos de contacto:</Heading>
      <Row gap="16">
        <Input name="email" id="email" label="Correo electrónico:" onChange={e=>{
            setData({patient:{...patient,email:e.target.value}})
        }} />
        <Input name="telefono" id="telefono" label="Teléfono:" onChange={e=>{
            setData({patient:{...patient,phone:e.target.value}})
        }} />
      </Row>
      <Row gap="16">
        <Select label="Región" id="region" options={[]} onChange={e=>{
            setData({patient:{...patient,region:e.target.value}})
        }} />
        <Select label="Comuna" id="comuna" options={[]} onChange={e=>{
            setData({patient:{...patient,comuna:e.target.value}})
        }} />
      </Row>
      <Input name="direccion" id="direccion" label="Dirección:" onChange={e=>{
            setData({patient:{...patient,address:e.target.value}})
      }} />
      <Link href="/create-order/exam" passHref>
        <Button fillWidth>Continuar</Button>
      </Link>
    </Column>
  );
}
