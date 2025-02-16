"use client"

import { Card, Column, Grid, Heading, Text} from "@/once-ui/components";
import { BarChart } from '@mui/x-charts/BarChart';

export default function AnalyticsPage() {
    return (
        <Column gap="16" fillWidth>
            <Heading as="h2">Analíticas</Heading>
            {/* Sección de métricas fundamentales */}
            <Grid columns={4} mobileColumns={1} tabletColumns={2} gap="16">
                <Card title="Ventas Totales" padding="16">
                    <Column gap="8">
                        <Text variant="heading-default-xs">Costo mensual</Text>
                        <Text variant="heading-default-xl">$1,000</Text>
                    </Column>
                </Card>
                <Card title="Órdenes" padding="16">
                    <Column gap="8">
                        <Text variant="heading-default-xs">Total de órdenes diarias</Text>
                        <Text variant="heading-default-xl">10</Text>
                    </Column>
                </Card>
                <Card title="Pacientes" padding="16">
                    <Column gap="8">
                        <Text variant="heading-default-xs">Nuevos pacientes</Text>
                        <Text variant="heading-default-xl">25</Text>
                    </Column>
                </Card>
                <Card title="Exámenes" padding="16">
                    <Column gap="8">
                        <Text variant="heading-default-xs">Total de exámenes</Text>
                        <Text variant="heading-default-xl">15</Text>
                    </Column>
                </Card>
            </Grid>

            {/* Gráfica de órdenes por estado */}
            <Column gap="16">
                <Heading as="h3">Órdenes por estado</Heading>
                <BarChart 
                    series={[
                        { label:"Pendientes",data: [5, 8, 6, 7] },
                        { label:"En progreso",data: [10, 15, 12, 18] },
                        { label:"Completadas",data: [2, 3, 4, 2] }
                    ]}
                    height={290}
                    xAxis={[{ data: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            </Column>

            {/* Comparativa semanal/mensual */}
            <Column gap="16">
                <Heading as="h3">Comparativa Semanal/Mensual</Heading>
                <BarChart 
                    series={[
                        {label:"Semanal",data: [30, 40, 50, 60]},
                        {label:"Mensual", data: [100, 120, 140, 160] }
                    ]}
                    height={290}
                    xAxis={[{ data: ['Enero', 'Febrero', 'Marzo', 'Abril'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            </Column>
        </Column>
    );
}
