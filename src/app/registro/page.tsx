"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Card,
  Flex,
  Heading,
  Text,
  Row,
  Grid,
  Column,
  Icon,
  Toast,
  PasswordInput,
} from "@/once-ui/components";
import dynamic from "next/dynamic";
import api from "@/api";
import { redirect } from "next/navigation";
import { plans } from "@/db/schema";
import { usePlanStore } from "../store/plan";

const Stepper = dynamic(() => import("@/components/Stepper"), { ssr: false });

interface Empresa {
  nombre: string;
  direccion: string;
  contacto: string;
  correo: string;
  rut: string;
  razonSocial: string;
  encargado: string;
  telefono: string;
}

const steps = ["Datos de la Empresa", "Definir Roles", "Contrato"];

export default function EmpresaRegistro() {
  const [step, setStep] = useState<number>(0);
  const [showCreatingUser, setShowCreatingUser] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const {setLabId} = usePlanStore()
  const [empresa, setEmpresa] = useState<Empresa>({
    nombre: "",
    direccion: "",
    contacto: "",
    correo: "",
    rut: "",
    razonSocial: "",
    encargado: "",
    telefono: "",
  });
  const [usuarios, setUsuarios] = useState<
    {
      email: string;
      rol: "Admin" | "Recepcionista" | "Gerente general" | string;
      password: string;
    }[]
  >([
    {
      email: "",
      rol: "Admin",
      password: "admin",
    },
  ]);

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const addUsuario = () =>
    setUsuarios([...usuarios, { email: "", rol: "Admin", password: "" }]);
  const updateUsuario = (
    index: number,
    field: "email" | "rol" | "password",
    value: "Admin" | "Recepcionista" | "Gerente general" | string
  ) => {
    const newUsuarios = [...usuarios];
    newUsuarios[index][field] = value;
    setUsuarios(newUsuarios);
  };

  useEffect(()=>{
    if(showCreatingUser){
      fetch("/api/labs",{
        method: "POST",
        body: JSON.stringify({
          lab:{
          name: empresa.nombre,
          address: empresa.direccion,
          phone: empresa.telefono,
          email: empresa.correo,
          rut: empresa.rut,
          razon_social: empresa.razonSocial,
          encargado: empresa.encargado,
          },
          users: usuarios
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => data.json()).then((data) => {
        if(data.error){
          alert(data.error);
        }else{
          setShowCreatingUser(false);
          setUserCreated(true);
          setLabId(data.labId);
          setTimeout(() => {
            redirect("/checkout");
          }, 3000);
        }
      }
      )
    }
  })



  return (
    <Flex
      radius="l"
      background="neutral-weak"
      shadow="m"
      direction="column"
      fillWidth
      maxWidth={"s"}
      padding="24"
      gap="12"
      margin="24"
    >
      <Stepper step={step} steps={steps} />
      {step === 0 && (
        <Flex direction="column" gap="12">
          <Heading>Registrar Laboratorio</Heading>
          <Input
            id="empresa"
            label="Nombre"
            value={empresa.nombre}
            onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
          />
          <Input
            id="address"
            label="Dirección"
            value={empresa.direccion}
            onChange={(e) =>
              setEmpresa({ ...empresa, direccion: e.target.value })
            }
          />
          <Input
            id="email"
            label="Correo"
            value={empresa.correo}
            onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })}
          />
          <Input
            id="rut"
            label="RUT"
            value={empresa.rut}
            onChange={(e) => setEmpresa({ ...empresa, rut: e.target.value })}
          />
          <Input
            id="razon"
            label="Razón Social"
            value={empresa.razonSocial}
            onChange={(e) =>
              setEmpresa({ ...empresa, razonSocial: e.target.value })
            }
          />
          <Input
            id="encargado"
            label="Encargado"
            value={empresa.encargado}
            onChange={(e) =>
              setEmpresa({ ...empresa, encargado: e.target.value })
            }
          />
          <Input
            id="tel"
            label="Teléfono/WhatsApp"
            value={empresa.telefono}
            onChange={(e) =>
              setEmpresa({ ...empresa, telefono: e.target.value })
            }
          />
        </Flex>
      )}
      {step === 1 && (
        <Column gap="8">
          <Heading variant="heading-strong-m">Definir Roles</Heading>
          <Column gap="16">
            {usuarios.map((usuario, index) => (
              <Column gap="8" key={index}>
                <Row gap="8">
                  <Input
                    id="email"
                    label="Correo"
                    type="email"
                    value={usuario.email}
                    onChange={(e) =>
                      updateUsuario(index, "email", e.target.value)
                    }
                  />
                  <Select
                    label="Seleccionar rol:"
                    id="role"
                    options={[
                      { label: "Admin", value: "Admin" },
                      {
                        label: "Recepcionista",
                        value: "Recepcionista",
                      },
                      {
                        label: "Gerente general",
                        value: "Gerente General",
                      },
                    ]}
                    value={usuario.rol}
                    onSelect={(value) =>
                      updateUsuario(
                        index,
                        "rol",
                        value as "Admin" | "Recepcionista" | "Gerente General"
                      )
                    }
                    onChange={(event) =>
                      updateUsuario(
                        index,
                        "rol",
                        event.target.value as
                          | "Admin"
                          | "Recepcionista"
                          | "Dueño"
                      )
                    }
                  />
                </Row>
                <PasswordInput
                  id="password"
                  label="Contraseña"
                  value={usuario.password}
                  onChange={(e) =>
                    updateUsuario(index, "password", e.target.value)
                  }
                />
                <Flex
                  fillWidth
                  height={0.6}
                  radius="l"
                  background="accent-alpha-medium"
                ></Flex>
              </Column>
            ))}
          </Column>
          <Button onClick={addUsuario}>Agregar Usuario</Button>
        </Column>
      )}
      {step === 2 && (
        <Card radius="m" padding="16" gap="8">
          <Column padding="8" gap="8" horizontal="center">
            <Heading variant="heading-strong-xl">Contrato</Heading>
            <iframe src="/Contrato.pdf" width="100%" height="500px"></iframe>
            <Flex vertical="center" gap="8" horizontal="center">
              <Icon name="info"></Icon>
              <Text variant="body-default-s">
                Al dar click acepta las condiciones del contrato
              </Text>
            </Flex>
            <Button onClick={() => setShowCreatingUser(true)}>Firmar</Button>
          </Column>
        </Card>
      )}
      <Flex gap="8">
        {step > 0 && <Button onClick={handleBack}>Atrás</Button>}
        {step < steps.length - 1 && step != 2 && (
          <Button onClick={handleNext}>Siguiente</Button>
        )}
      </Flex>
      {showCreatingUser && (
        <Toast variant="success">Creando laboratorio...</Toast>
      )}
      {userCreated && (
        <Toast variant="success">Laboratorio creado con exito</Toast>
      )}
    </Flex>
  );
}
