import React from 'react'
import {BoardForm} from "~/app/boards/new/boardForm";

export default function newBoardPage() {
    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-2xl"}> Create a new board </h1>
            <BoardForm/>
        </div>
    );
}