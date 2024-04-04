import {prisma} from "~/src/db/prisma";
import {Proposition} from "~/src/components/proposition/PropositionLine";
import {PropositionForm} from "~/app/boards/[...boardId]/PropositionForm";

export default async function BoardPage({
                                            params,
                                        }: {
    params: { boardId: string }
}) {
    const boardId = Number(params.boardId)

    const propositions = await prisma.proposition.findMany({
        where: {
            boardId: boardId,
        },
        orderBy:{
            vote:{
                _count: "desc",
            },
        },
        select:{
            title: true,
            id: true,
            _count:{
                select:{
                    vote:true,
                }
            }
        }
    });
    return (
        <div className={"flex flex-col gap-8"}>
            <PropositionForm boardId={boardId}/>
       <ul className={"flex flex-col gap-4"}>
           {propositions.map(proposition =>(
               <Proposition voteCount={proposition._count.vote} key={proposition.id} {...proposition}/>
           ))}
       </ul>
        </div>
    );
}