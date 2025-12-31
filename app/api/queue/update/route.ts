import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { windowId, ticketNumber, status } = body

        if (!windowId || !ticketNumber || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const updated = await prisma.queue.updateMany({
            where: {
                windowId: Number(windowId),
                ticketNumber: Number(ticketNumber),
                status: 'waiting' // Only update waiting tickets
            },
            data: { 
                status: status,
                ...(status === 'completed' && { deletedAt: new Date() }) // Soft delete if completed
            },
        })

        if (updated.count === 0) {
            return NextResponse.json({ error: 'Ticket not found or already processed' }, { status: 404 })
        }

        return NextResponse.json({ 
            success: true, 
            updatedCount: updated.count,
            message: `Ticket ${ticketNumber} status updated to ${status}`
        })
    } catch (error) {
        console.error('Error updating queue:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const updated = await prisma.queue.updateMany({
            data: { windowId: 2 },
        })

        return NextResponse.json({ updatedCount: updated.count })
    } catch (error) {
        console.error('Error in GET request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
