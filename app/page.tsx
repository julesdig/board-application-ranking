import {prisma} from "~/src/db/prisma";
import {BoardCard} from "~/src/components/board/BoardCard";
import Link from "next/link";
import {BoardForm} from "~/app/boards/new/boardForm";
import React from "react";

export default async function Home() {
  const boards=  await prisma.board.findMany();
  return <div className={"flex flex-col gap-4"}>
    <h1 className={'text-5xl font-bold'}>Boards list </h1>
    <BoardForm/>
    <ul className={'flex flex-col gap-2'}>
      {boards.map(board => (<BoardCard key={board.id} board={board}/>))}
    </ul>
  </div>;
}
