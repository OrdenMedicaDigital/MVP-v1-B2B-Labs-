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
        </Column>
      </Column>
    </Column>
  );
};

Sidebar.displayName = "Sidebar";
export { Sidebar };
