import {NextApiRequest, NextApiResponse} from "next";
import {Board} from "@prisma/client";
import {z} from "zod";
import {prisma} from "~/src/db/prisma";
type Data = {
    board: Board;
}
const BodyScheme = z.object({
    title: z.string().min(3).max(255),
});

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
 if(req.method !== 'POST'){
     return res.status(405).end();
 }

 const body = BodyScheme.parse(JSON.parse(req.body));
 const board = await prisma.board.create({
     data:{
         title: body.title
     }
 });

 res.status(201).json({board});
}