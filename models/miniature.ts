import prisma from '@/lib/prisma';
import {rumble_miniatures} from '@prisma/client';

export async function getMiniatures() {
    const res = await prisma.rumble_miniatures.findMany();

    return JSON.parse(JSON.stringify(res));
}

export async function getMiniatureById(id: number) {
    const res = await prisma.rumble_miniatures.findUnique({
        where: {
            id,
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getMiniatureByDefId(defId: string) {
    const res = await prisma.rumble_miniatures.findUnique({
        where: {
            defId,
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function createMiniature(data: any) {
    const created = await prisma.rumble_miniatures.create({
        data,
    });

    return JSON.parse(JSON.stringify(created));
}

export async function updateMiniature(data: any) {
    const updated = await prisma.rumble_miniatures.update({
        where: {
            id: data.id,
        },
        data: data,
    });

    return JSON.parse(JSON.stringify(updated));
}

export async function updateMiniatureByDefId(data: any) {
    const updated = await prisma.rumble_miniatures.update({
        where: {
            id: data.defId,
        },
        data: data,
    });

    return JSON.parse(JSON.stringify(updated));
}
