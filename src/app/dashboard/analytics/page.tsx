import Graficas from "@/components/Graficas";
import Prepago from "@/components/Prepago";
import { db, getOrdersByFilter, getPatientsLab, getTotalExams } from "@/db/queries";
import { labs } from "@/db/schema";
import { formatCurrency } from "@/lib/formatCurrency";
import { Card, Column, Grid, Heading, Text } from "@/once-ui/components";
import { FaClipboardList, FaDollarSign, FaUserInjured, FaVial } from "react-icons/fa";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  const labId = session?.user.labId as number;
  const [{ type }] = await db.select().from(labs).where(eq(labs.id, labId)).limit(1);
  const precioOrden = 2190;
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  // Obtener las órdenes diarias para todo el mes
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 1);
  const ordenesMensuales = await getOrdersByFilter(labId, undefined, startDate.toDateString(), endDate.toDateString());

  // Calcular las órdenes diarias para cada día del mes
  const ordenesPorDia = Array.from({ length: 31 }, (_, i) => {
    const fecha = new Date(year, month, i + 1);
    return ordenesMensuales.filter(o => new Date(o.date).toDateString() === fecha.toDateString()).length;
  });

  const ordenesPorSemana = Array.from({ length: 4 }, (_, i) => {
    const inicio = new Date(year, month, i * 7 + 1);
    const fin = new Date(year, month, (i + 1) * 7 + 1);
    return ordenesMensuales.filter(o => new Date(o.date) >= inicio && new Date(o.date) < fin).length;
  });

  // Filtrar los días con datos y asignar los días correspondientes
  const ordenesDiarias = ordenesPorDia
    .map((count, index) => ({ day: `${index + 1} de ${new Date(year, month).toLocaleString('default', { month: 'long' })}`, count }))
    .filter(o => o.count > 0);

  return (
    <Column gap="16" fillWidth>
      <Heading as="h2">Analíticas</Heading>
      <Grid columns={4} mobileColumns={1} tabletColumns={2} gap="16">
        {type === "Uso" && (
          <Card title="Ventas Totales" padding="16">
            <Column gap="8">
              <FaDollarSign className="text-green-500 text-2xl" />
              <Text variant="heading-default-xs">Costo mensual</Text>
              <Text variant="heading-default-xl">{formatCurrency(ordenesMensuales.length * precioOrden)}</Text>
            </Column>
          </Card>
        )}
        {type === "Prepago" && <Prepago />}
        <Card title="Órdenes" padding="16">
          <Column gap="8">
            <FaClipboardList className="text-blue-500 text-2xl" />
            <Text variant="heading-default-xs">Total de órdenes diarias</Text>
            <Text variant="heading-default-xl">{ordenesMensuales.length}</Text>
          </Column>
        </Card>
        <Card title="Pacientes" padding="16">
          <Column gap="8">
            <FaUserInjured className="text-red-500 text-2xl" />
            <Text variant="heading-default-xs">Nuevos pacientes</Text>
            <Text variant="heading-default-xl">{(await getPatientsLab(labId)).length}</Text>
          </Column>
        </Card>
        <Card title="Exámenes" padding="16">
          <Column gap="8">
            <FaVial className="text-purple-500 text-2xl" />
            <Text variant="heading-default-xs">Total de exámenes</Text>
            <Text variant="heading-default-xl">{(await getTotalExams(labId)).length}</Text>
          </Column>
        </Card>
      </Grid>
      <Graficas ordenesDelMes={ordenesMensuales.length} ordenesPorSemana={ordenesPorSemana} ordenesDiarias={ordenesDiarias} />
    </Column>
  );
}
