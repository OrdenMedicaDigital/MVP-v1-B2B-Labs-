"use client";

import { useSidebarStore } from "@/app/store/sidebar";
import useLab from "@/hooks/useLab";
import {
  Button,
  Column,
  Icon,
  IconButton,
  Line,
  Row,
  SmartLink,
  Tag,
  Text,
  ToggleButton,
} from "@/once-ui/components";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar: React.FC = ({}) => {
  const pathname = usePathname() ?? "";
  const lab = useLab()
  const { isMobile, setIsMobile, open, toggle } = useSidebarStore();
  const { data } = useSession();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Column
      maxWidth={16}
      fill
      paddingX="16"
      paddingY="32"
      gap="m"
      background="page"
      border="neutral-weak"
      radius="l"
      position={isMobile ? "fixed" : "fixed"}
      left="0"
      top="0"
      zIndex={10}
      style={{
        transform: !isMobile || open ? "translateX(0)" : "translateX(-400px)",
        transition: "transform 0.3s",
      }}
    >
      <Column fill paddingX="xs" gap="m">
        <Column fillWidth gap="4">
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            marginBottom="8"
            marginLeft="16"
          >
            Dashboard
          </Text>
          <Line />
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            marginTop="8"
            marginBottom="8"
            marginLeft="16"
          >
            {data?.user.email}
          </Text>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "/dashboard/create-order"}
          >
            <Row
              fillWidth
              padding="4"
              vertical="center"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink
                onClick={toggle}
                fillWidth
                href="/dashboard/create-order"
              >
                <Icon name="order" onBackground="neutral-weak" size="xs" />
                Crear orden medica
              </SmartLink>
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "/"}
          >
            <Row
              fillWidth
              padding="4"
              vertical="center"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink onClick={toggle} fillWidth href="/dashboard">
                <Icon name="home" onBackground="neutral-weak" size="xs" />
                Historial
              </SmartLink>
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "/dashboard/analytics"}
          >
            <Row
              fillWidth
              padding="4"
              vertical="center"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink onClick={toggle} fillWidth href="/dashboard/analytics">
                <Icon name="analytics" onBackground="neutral-weak" size="xs" />
                Metricas
              </SmartLink>
            </Row>
          </ToggleButton>
          {lab && lab?.type === "Uso" && (
            <ToggleButton
              fillWidth
              justifyContent="flex-start"
              selected={pathname === "/dashboard/billing"}
            >
              <Row
                fillWidth
                padding="4"
                vertical="center"
                gap="12"
                textVariant="label-default-s"
              >
                <SmartLink onClick={toggle} fillWidth href="/dashboard/billing">
                  <Icon name="billing" onBackground="neutral-weak" size="xs" />
                  Facturación
                </SmartLink>
              </Row>
            </ToggleButton>
          )}
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={false}
            style={{ height: "auto" }}
          >
            <Row fillWidth padding="4" gap="12" textVariant="label-default-s">
              <SmartLink
                style={{ textWrap: "wrap" }}
                onClick={toggle}
                fillWidth
                href="https://docs.google.com/forms/d/e/1FAIpQLSd5TFaUPG_itEenQ_oU3O4J_v66WaBS4eg6sddmpn_O89MEDw/viewform"
              >
                <Icon name="order" onBackground="neutral-weak" size="xs" />
                Informe medico de examenes
              </SmartLink>
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={false}
            style={{
              height: "auto",
            }}
          >
            <Row fillWidth padding="4" gap="12" textVariant="label-default-s">
              <SmartLink
                style={{
                  textWrap: "wrap",
                }}
                onClick={toggle}
                fillWidth
                href="https://agendamiento.reservo.cl/makereserva/agenda/i0MhpNd0P07vhU3M6B938Mv5R0w7ao"
              >
                <Icon name="order" onBackground="neutral-weak" size="xs" />
                Agendar Hora Médica Evaluación de Examenes
              </SmartLink>
            </Row>
          </ToggleButton>
        </Column>
      </Column>
      <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "/"}
          >
            <Row
              fillWidth
              padding="4"
              vertical="center"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink onClick={async e=>{
                await signOut()
                toggle()
              }} fillWidth href="/">
                <Icon name="logout" onBackground="neutral-weak" size="xs" />
                Cerrar sesion
              </SmartLink>
            </Row>
          </ToggleButton>
    </Column>
  );
};

Sidebar.displayName = "Sidebar";
export { Sidebar };
