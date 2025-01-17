import {NextApiRequest, NextApiResponse} from "next";
import {Proposition} from "@prisma/client";
import {z} from "zod";
import {prisma} from "~/src/db/prisma";


type Data = {
    proposition: Proposition;
}
const BodyScheme = z.object({
    title: z.string().min(3).max(255),
});

const QueryScheme = z.object({boardId: z.string().transform((id)=>Number(id))});

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
const query = QueryScheme.parse(req.query);
    const body = BodyScheme.parse(JSON.parse(req.body));
    const proposition = await prisma.proposition.create({
        data:{
            title: body.title,
            boardId: query.boardId,
            ip: String(Math.random()),
        }
    });

    res.status(201).json({proposition});
}