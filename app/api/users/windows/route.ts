import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const userWindows = await prisma.userWindow.findMany({
            where: { userId: Number(userId) },
            include: { window: true },
        });

        const result = userWindows.map((uw) => ({
            windowId: uw.window.id,
            windowTitle: uw.window.windowTitle,
            windowDescription: uw.window.windowDescription,
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
