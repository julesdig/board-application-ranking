"use client";
import {Input} from "~/src/components/form/Input";
import { Button } from "~/src/components/form/Bouton";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";

type PropositionFormProps = {
    boardId: number;
}

export const PropositionForm = ({boardId}:PropositionFormProps) => {
    const router = useRouter();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData=  new FormData(event.currentTarget);
        const title = String(formData.get('title'));
        fetch(`/api/boards/${boardId}/propositions`, {
            method: 'POST',
            body: JSON.stringify({title})
        }).then(response => response.json())
            .then(data =>{
                router.refresh();
            })

    }
    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>

            <Input label={"Title"} name={"title"} />
            <Button type={"submit"}> Create Proposition </Button>
        </form>
    )
}