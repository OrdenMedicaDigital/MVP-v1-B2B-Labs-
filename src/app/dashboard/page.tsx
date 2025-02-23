"use client";
import { insertExams } from "@/db/exams";
import {
  Button,
  Column,
  DatePicker,
  DateRangePicker,
  Flex,
  Heading,
  Icon,
  Input,
  Row,
  SmartLink,
  Spinner,
  Text,
} from "@/once-ui/components";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [data, setData] = useState<
    {
      orderId: number;
      patientName: string;
      patientPaterno: string;
      patientMaterno: string;
      date: string;
      state: string;
      exams: { code: string; name: string }[];
    }[]
  >([]);
  const [loading,setLoading] = useState<boolean>(false);
  const {data:session} = useSession()

  const handleFilter = async () => {
    setLoading(true);
    fetch("/api/order/search", {
      method: "POST",
      body: JSON.stringify({ name: search, startDate, endDate, labId: session?.user.labId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
    }).finally(()=>{
        setLoading(false);
    })
  };

  useEffect(()=>{
    setLoading(true);
    fetch("/api/order",{
      method:"POST",
      body: JSON.stringify({labId:session?.user.labId}),
      headers:{
        "Content-Type":"application/json"
      }
    }).then((data) => data.json()).then((data) => {
      setData(data);
    }).finally(()=>{
      setLoading(false);
    })
  },[session])

  return (
    <Column fillWidth>
      <Column fillWidth maxWidth="xl" padding="l" gap="24">
        <Flex direction="column" lang="es_MX" fillWidth fillHeight gap="16" vertical="center">
          <Input
            id="Search"
            label="Buscar por nombre"
            labelAsPlaceholder
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DateRangePicker onChange={(e) => {
            setStartDate(e.startDate);
            setEndDate(e.endDate);
          }}>

          </DateRangePicker>
          <Button onClick={handleFilter} fillWidth>
            <Icon fillHeight name="filter" size="s" />
            Filtrar
          </Button>
        </Flex>
        <Row fillWidth>
          <Heading as="h2">Órdenes médicas</Heading>
        </Row>
        <Row fillWidth>
          <Column fillWidth>
            {!loading && data.length > 0 ? data.map((item, index) => {
              return (
                <SmartLink
                  href={`/dashboard/order/${item.orderId}`}
                  key={index}
                  fillWidth
                >
                  <Row key={index} fillWidth gap="8">
                    <Column
                      fillWidth
                      padding="m"
                      background="surface"
                      radius="m"
                    >
                      <Row
                        fillWidth
                        vertical="center"
                        horizontal="space-between"
                      >
                        <Heading as="h4" variant="body-default-xl">
                          {`${item.patientName} ${item.patientPaterno} ${item.patientMaterno}`}
                        </Heading>
                        <Text variant="body-default-s" color="subtle">
                          {item.date}
                        </Text>
                      </Row>
                      <Row fillWidth horizontal="space-between">
                        <Text variant="body-default-m">
                          Estado:{" "}
                          {item.state === "pending"
                            ? "Pendiente"
                            : item.state === "finished"
                            ? "Completado"
                            : "En proceso"}
                        </Text>
                        <Text variant="body-default-m">
                          Exámenes: {item.exams?.length || 0}
                        </Text>
                      </Row>
                    </Column>
                  </Row>
                </SmartLink>
              );
            }) : loading ? <Spinner /> : <Text>No hay resultados</Text>}
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
