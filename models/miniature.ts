import prisma from '@/lib/prisma';
import {objToJSON} from '@/lib/utils';
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
            defId: data.defId,
        },
        data: data,
    });

    return objToJSON(updated);
}

export async function getFamilies(locale = 'en'): Promise<LocaleJson[]> {
    const families = await prisma.rumble_miniatures.findMany({
        distinct: ['family'],
        select: {family: true},
    });

    return objToJSON(families.map(family => family.family).sort());
}

export async function getTypes(locale = 'en'): Promise<LocaleJson[]> {
    const types = await prisma.rumble_miniatures.findMany({
        distinct: ['type'],
        select: {type: true},
    });

    return objToJSON(types.map(type => type.type).sort());
}

export async function getRoles(locale = 'en'): Promise<LocaleJson[]> {
    const roles = await prisma.rumble_miniatures.findMany({
        distinct: ['role'],
        select: {role: true},
    });

    return objToJSON(roles.map(role => role.role).sort());
}

export async function getCategories(locale = 'en'): Promise<LocaleJson[]> {
    const categories = await prisma.rumble_miniatures.findMany({
        distinct: ['category'],
        select: {category: true},
    });

    return objToJSON(categories);
}
