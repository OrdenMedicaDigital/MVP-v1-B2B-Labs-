'use client';

import { useState } from 'react';
import { Button, Input, Select, Card, Flex, Heading, Text, Row, Grid, Column } from '@/once-ui/components';
import dynamic from 'next/dynamic';

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

interface Plan {
  name: string;
  orders: number | string;
  price: number | string;
  pricePerOrder: number | string | null;
}

const steps = ['Datos de la Empresa', 'Definir Roles', 'Seleccionar Plan'];
const plans: Plan[] = [
  { name: 'Pack 50', orders: 50, price: 108405, pricePerOrder: 2168.10 },
  { name: 'Pack 100', orders: 100, price: 214620, pricePerOrder: 2146 },
  { name: 'Pack 200', orders: 200, price: 426900, pricePerOrder: 2134.50 },
  { name: 'Pack 300', orders: 300, price: 636900, pricePerOrder: 2123 },
  { name: 'Pack 400', orders: 400, price: 844600, pricePerOrder: 2111.50 },
  { name: 'Pack Estándar', orders: 500, price: 1050000, pricePerOrder: 2100 },
  { name: 'Pack 600', orders: 600, price: 1257660, pricePerOrder: 2096.10 },
  { name: 'Pack 700', orders: 700, price: 1464540, pricePerOrder: 2092.20 },
  { name: 'Pack 800', orders: 800, price: 1670640, pricePerOrder: 2088.30 },
  { name: 'Pack Premium', orders: 1000, price: 2080500, pricePerOrder: 2080.50 },
  { name: 'Pack Enterprise', orders: '2000+', price: 'Negociable', pricePerOrder: null }
];

const formatCurrency = (value: number | string) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    }
    return value;
  };

export default function EmpresaRegistro() {
  const [step, setStep] = useState<number>(0);
  const [empresa, setEmpresa] = useState<Empresa>({
    nombre: '',
    direccion: '',
    contacto: '',
    correo: '',
    rut: '',
    razonSocial: '',
    encargado: '',
    telefono: ''
  });
  const [usuarios, setUsuarios] = useState<{ nombre: string; rol: string, password: string }[]>([{
    nombre: "Administrador",
    rol: "Admin",
    password: "admin"
  }]);
  const [plan, setPlan] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const addUsuario = () => setUsuarios([...usuarios, { nombre: '', rol: '' }]);
  const updateUsuario = (index: number, field: 'nombre' | 'rol', value: string) => {
    const newUsuarios = [...usuarios];
    newUsuarios[index][field] = value;
    setUsuarios(newUsuarios);
  };

  return (
    <Flex radius='l' background='neutral-weak' shadow='m' direction='column' fillWidth maxWidth={"s"} padding='24' gap='12' margin='24'>
        <Stepper step={step} steps={steps} />
      {step === 0 && (
        <Flex direction='column' gap='12'>
          <Heading>Datos de la Empresa</Heading>
          <Input label='Nombre' value={empresa.nombre} onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })} />
          <Input label='Dirección' value={empresa.direccion} onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })} />
          <Input label='Contacto' value={empresa.contacto} onChange={(e) => setEmpresa({ ...empresa, contacto: e.target.value })} />
          <Input label='Correo' value={empresa.correo} onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })} />
          <Input label='RUT' value={empresa.rut} onChange={(e) => setEmpresa({ ...empresa, rut: e.target.value })} />
          <Input label='Razón Social' value={empresa.razonSocial} onChange={(e) => setEmpresa({ ...empresa, razonSocial: e.target.value })} />
          <Input label='Encargado' value={empresa.encargado} onChange={(e) => setEmpresa({ ...empresa, encargado: e.target.value })} />
          <Input label='Teléfono/WhatsApp' value={empresa.telefono} onChange={(e) => setEmpresa({ ...empresa, telefono: e.target.value })} />
        </Flex>
      )}
      {step === 1 && (
        <div>
          <h2>Definir Roles</h2>
          {usuarios.map((usuario, index) => (
            <Column gap='8' key={index}>
                <Row gap='8'>
                <Input id='nombre' label='Nombre' value={usuario.nombre} onChange={(e) => updateUsuario(index, 'nombre', e.target.value)} />
              <Select label='Seleccionar rol:' id='role' options={[{label:"Admin",value:"Admin"},{
                label: "Recepcionista",
                value: "Recepcionista"
              },{
                label:"Dueño",
                value:"Dueño"
              }]} value={usuario.rol} onChange={(value) => updateUsuario(index, 'rol', value.target.value)} />
                </Row>
                <Input type='password' id='password' label='Contraseña' value={usuario.password} onChange={(e) => updateUsuario(index, 'password', e.target.value)} />
            </Column>
          ))}
          <Button onClick={addUsuario}>Agregar Usuario</Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Seleccionar Plan</h2>
          <Grid gap='8' columns={3} tabletColumns={2} mobileColumns={1}>
            {plans.map((p) => (
              <Card radius='l' direction='column' padding='8' gap='4' key={p.name} className={`p-4 cursor-pointer ${plan === p.name ? 'border-2 border-blue-500' : ''}`} onClick={() => setPlan(p.name)}>
                <Heading variant='body-strong-xl'>{p.name}</Heading>
                <Text variant='body-default-s'>Órdenes: {p.orders}</Text>
                <Row gap='4'>
                <Text variant='body-default-s'>{formatCurrency(p.price)} neto (no incluye IVA)</Text>
                <Text variant='body-default-s'>{p.pricePerOrder && `(${formatCurrency(p.pricePerOrder)}/orden)`}</Text>
                </Row>
              </Card>
            ))}
          </Grid>
        </div>
      )}
      <Flex gap='8'>
        {step > 0 && <Button onClick={handleBack}>Atrás</Button>}
        {step < steps.length - 1 ? <Button onClick={handleNext}>Siguiente</Button> : <Button onClick={() => console.log({ empresa, usuarios, plan })}>Finalizar</Button>}
      </Flex>
    </Flex>
  );
}
