import { getAllLabs } from "@/db/queries";
import { Card, Column, Grid, Heading, Text } from "@/once-ui/components";
import { BarChart } from '@mui/x-charts/BarChart';

export default async function DashboardAdmin() {
    const labs = await getAllLabs()
    return (
        <Column gap="16" fillWidth>
            {labs.length > 0 ? labs.map(lab => (
                <Card title={lab.name} padding="16">
                    <Column gap="8">
                        <Text variant="heading-default-xs">Órdenes</Text>
                        <Text variant="heading-default-xl">10</Text>
                    </Column>
                </Card>
            )) : <Text variant="heading-default-xl">No hay laboratorios registrados</Text>}
        </Column>
    );
}
