import React from "react";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from "../lib/AntdRegistry";
const inter = Inter({ subsets: ['latin'] })
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import QueryWrapper from "@/components/shared/QueryWrapper";
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
      <StyledComponentsRegistry>
          <QueryWrapper>
              <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </QueryWrapper>
      </StyledComponentsRegistry></body>
    </html>
  )
}
