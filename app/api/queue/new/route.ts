import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const STARTING_TICKET = 10100

export async function POST(req: Request) {
    const body = await req.json()
    const { studentId, firstName, lastName, windowId } = body
    
    const existingTicket = await prisma.queue.findFirst({
        where: { studentId: studentId, windowId: windowId, status: "waiting" },    })

    if (existingTicket) {                
            return NextResponse.json(existingTicket)        
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

    return NextResponse.json(newTicket)
}
