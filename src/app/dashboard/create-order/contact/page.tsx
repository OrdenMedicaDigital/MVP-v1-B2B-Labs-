"use client"
import { useOrderStore } from "@/app/store/order";
import useRegiones from "@/hooks/useRegiones";
import { Button, Column, Heading, Input, Row, Select } from "@/once-ui/components";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const {setData,patient} = useOrderStore()
  const regiones = useRegiones()
  const [comunas,setComunas] = useState<{idCity:number,name:string}[]>([])


  useEffect(()=>{
    fetch(`/api/comunas`,{
      method:"POST",
      body:JSON.stringify({regionId:patient.region.id}),
      headers:{
        "Content-Type":"application/json"
      }
    }).then((data)=>data.json()).then((data)=>{
      setComunas(data)
    })
  },[patient.region])

  return (
    <Column fillWidth gap="16">
      <Heading as="h3">Datos de contacto:</Heading>
      <Row gap="16">
        <Input value={patient.email} name="email" id="email" label="Correo electrónico:" onChange={e=>{
            setData({patient:{...patient,email:e.target.value}})
        }} />
        <Input value={patient.phone} name="telefono" id="telefono" label="Teléfono:" onChange={e=>{
            setData({patient:{...patient,phone:e.target.value}})
        }} />
      </Row>
      <Row gap="16">
        <Select value={patient.region.name} label="Región" id="region" options={regiones.map((v)=>({label:v.name,value:v.idRegion.toString()}))} onSelect={value=>{
            setData({patient:{...patient,region:{
                id:parseInt(value),
                name:regiones.find((v)=>v.idRegion===parseInt(value))?.name as string
            }}})
        }} />
        <Select value={patient.comuna.name} label="Comuna" id="comuna" options={comunas.map(v=>({label:v.name,value:v.idCity.toString()}))} onSelect={value=>{
            setData({patient:{...patient,comuna:{
                id:parseInt(value),
                name:comunas.find((v)=>v.idCity===parseInt(value))?.name as string
            }}})
        }} />
      </Row>
      <Input value={patient.address} name="direccion" id="direccion" label="Dirección:" onChange={e=>{
            setData({patient:{...patient,address:e.target.value}})
      }} />
      <Link href="/dashboard/create-order/exam" passHref>
        <Button fillWidth>Continuar</Button>
      </Link>
    </Column>
  );
}
