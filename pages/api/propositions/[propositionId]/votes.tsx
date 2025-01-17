import {NextApiRequest, NextApiResponse} from "next";
import {Vote} from "@prisma/client";
import {z} from "zod";
import {prisma} from "~/src/db/prisma";


type Data = {
    vote: Vote;
}
const QueryScheme = z.object({propositionId: z.string().transform((id)=>Number(id))});

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    const query = QueryScheme.parse(req.query);
    const vote = await prisma.vote.create({
        data:{
            ip: String(Math.random()),
            propositionId: query.propositionId,
        }
    });

    res.status(201).json({vote});
}