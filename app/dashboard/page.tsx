"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { IconMessage } from "@tabler/icons-react"
import { useState } from "react"

import data from "./data.json"

export default function Page() {
  const [showChat, setShowChat] = useState(false)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 48)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowChat(!showChat)}
          size="lg"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <IconMessage className="h-5 w-5" />
        </Button>
      </div>

      {/* Full Screen Chat Overlay */}
      {showChat && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="flex h-full w-full">
            <div className="w-80 bg-sidebar">
              <ChatSidebar onClose={() => setShowChat(false)} />
            </div>
            <div className="flex-1 bg-background">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">AI Assistant</h2>
                  <p className="text-muted-foreground">Select a chat session to start conversing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarProvider>
  )
}
