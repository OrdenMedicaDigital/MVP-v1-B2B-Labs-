"use client";

import { useSidebarStore } from "@/app/store/sidebar";
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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar: React.FC = ({}) => {
  const pathname = usePathname() ?? "";
  const { isMobile, setIsMobile, open, toggle } = useSidebarStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
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
      zIndex={2}
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
              <SmartLink onClick={toggle} fillWidth href="/">
                <Icon name="home" onBackground="neutral-weak" size="xs" />
                Historial
              </SmartLink>
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "/create-order"}
          >
            <Row
              fillWidth
              padding="4"
              vertical="center"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink onClick={toggle} fillWidth href="/create-order">
                <Icon name="order" onBackground="neutral-weak" size="xs" />
                Crear orden medica
              </SmartLink>
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={false}
            style={{height:"auto"}}

          >
            <Row
              fillWidth
              padding="4"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink style={{textWrap:"wrap"}} onClick={toggle} fillWidth href="/create-order">
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
              height:"auto"
            }}
          >
            <Row
              fillWidth
              padding="4"
              gap="12"
              textVariant="label-default-s"
            >
              <SmartLink style={{
                textWrap: "wrap",
              }} onClick={toggle} fillWidth href="/create-order">
                <Icon name="order" onBackground="neutral-weak" size="xs" />
                Agendar Hora Médica Evaluación de Examenes
              </SmartLink>
            </Row>
          </ToggleButton>
        </Column>
      </Column>
    </Column>
  );
};

Sidebar.displayName = "Sidebar";
export { Sidebar };
