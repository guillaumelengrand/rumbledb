import prisma from "@/lib/prisma";
import { objToJSON } from "@/lib/utils";

export async function getDecks() {
    const decks = await prisma.rumble_deck.findMany()

    return objToJSON(decks)
}

export async function getDeck(id: string) {
    const deck = await prisma.rumble_deck.findUnique({
        where: {id},
        include: {
            miniatures: true
        }
    });

    return objToJSON(deck)
}

export async function createDeck(deck : any) {
    console.log({deck});
    
    try {
        const newDeck = await prisma.rumble_deck.create({
            data: deck
        })
    
        return objToJSON(newDeck)
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function updateDeck(deck: any) {
    try {
        const updateDeck = await prisma.rumble_deck.update({
            where: {
                id: deck.id
            },
            data: deck
        })
    
        return objToJSON(updateDeck)
    } catch (error) {
        console.log(error);
        return null
    }
}