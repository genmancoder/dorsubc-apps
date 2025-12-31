"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type QueeWindow = {
  id: number
  windowTitle: string
  windowDescription: string
}

export default function Request() {
  const [open, setOpen] = useState(false)
  const [windows, setWindows] = useState<QueeWindow[]>([])
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [selectedWindow, setSelectedWindow] = useState<QueeWindow | null>(null)
  const [ticket, setTicket] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchWindows = async () => {
    const res = await fetch("/api/window/list")
    if (res.ok) {
      const data = await res.json()
      setWindows(data)
    }
  }

   const goFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

}

  const handleWindowSelect = (window: QueeWindow) => {
    setSelectedWindow(window)
    setConfirmDialog(true)
  }

  const generateTicket = async () => {
    if (!selectedWindow) return

    setLoading(true)
    try {
      const res = await fetch("/api/queue/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            studentId: "student-123",
            firstName: "John",
            lastName: "Doe",
          windowId: selectedWindow.id,

        }),
      })

      if (res.ok) {
        const data = await res.json()
        setTicket(data.ticketNumber)
        setConfirmDialog(false)
        setOpen(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const closeDialog = () => {
    setOpen(false)
    setSelectedWindow(null)
  }

  useEffect(() => {
    fetchWindows()
  }, [])

  return (
    <div className="w-screen h-screen bg-background flex flex-col">
      {/* Header Section */}
      <header className="px-8 py-6 border-b border-border flex-shrink-0">
        <h1 className="text-4xl font-bold text-center">KYUU. DOrSU-BC ENROLLMENT</h1>
        <p className="text-muted-foreground text-center mt-2">Select a service window to get your ticket</p>
      </header>

      {/* Main Content - Scrollable Window Grid */}
      <main className="flex-1 overflow-auto px-8 py-6">
        {windows.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {windows.map((window) => (
              <button
                key={window.id}
                onClick={() => handleWindowSelect(window)}
                className="text-left p-8 rounded-lg border-2 border-border bg-card hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-200 cursor-pointer group min-h-32 flex flex-col justify-center"
              >
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {window.windowTitle}
                </h3>
                <p className="text-base text-muted-foreground">{window.windowDescription}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-lg">No service windows available at the moment.</p>
          </div>
        )}

        
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border px-8 py-4 flex gap-6 justify-center flex-shrink-0">
     
        <Button onClick={goFullscreen} className="bg-transparent hover:bg-transparent ">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />          
        </Button>
         
      </footer>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Service Window</DialogTitle>
            <DialogDescription className="text-lg">Are you sure you want to generate a ticket for this window?</DialogDescription>
          </DialogHeader>
          {selectedWindow && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Selected Window</p>
                <h3 className="font-semibold text-xl">{selectedWindow.windowTitle}</h3>
                <p className="text-sm text-muted-foreground mt-2">{selectedWindow.windowDescription}</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-3 sm:gap-2">
            <button
              onClick={() => setConfirmDialog(false)}
              className="flex-1 border border-border text-foreground font-semibold px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={generateTicket}
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Ticket"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ticket Generated Successfully!</DialogTitle>
            <DialogDescription>Please save your ticket number below.</DialogDescription>
          </DialogHeader>
          {ticket && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-3">Your Ticket Number</p>
              <h2 className="text-6xl font-bold text-primary">{ticket}</h2>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="w-full bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
