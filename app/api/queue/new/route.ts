import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { broadcastQueueUpdate } from '@/lib/websocket'

const STARTING_TICKET = 10100

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { studentId, firstName, lastName, windowId } = body

        if (!studentId || !firstName || !lastName || !windowId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }
    
        // Only check for duplicates if not a kiosk request (studentId is not "---")
        // Kiosk requests should always generate new tickets
        if (studentId !== "---") {
            const existingTicket = await prisma.queue.findFirst({
                where: { studentId: studentId, windowId: windowId, status: "waiting" },
            })

            if (existingTicket) {                
                return NextResponse.json(existingTicket)        
            }
        }
        
        const lastTicket = await prisma.queue.findFirst({
            orderBy: { ticketNumber: 'desc' },
        })

        const nextTicketNumber =
            lastTicket?.ticketNumber && lastTicket.ticketNumber >= STARTING_TICKET
                ? lastTicket.ticketNumber + 1
                : STARTING_TICKET;

        const newTicket = await prisma.queue.create({
            data: {
                studentId,
                firstName,
                lastName,
                ticketNumber: nextTicketNumber,
                windowId: windowId,
            },
        })

        // Broadcast queue update via WebSocket
        broadcastQueueUpdate(windowId, 'new')

        return NextResponse.json(newTicket)
    } catch (error) {
        console.error('Error in /api/queue/new:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
