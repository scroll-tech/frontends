"use client"

import React from "react"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

import "./global"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}
