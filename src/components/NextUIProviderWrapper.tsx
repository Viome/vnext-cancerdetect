"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

export default function NextUIProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return <NextUIProvider>{children}</NextUIProvider>;
}

