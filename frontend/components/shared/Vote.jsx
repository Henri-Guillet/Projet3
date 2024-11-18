'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { contractAddress, contractAbi } from "@/constants"
import { useWriteContract } from "wagmi"
import { Button } from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const Vote = ({ proposals }) => {

    const [selectedProposalId, setSelectedProposalId] = useState("")
    const { toast } = useToast()
    const { isPending: isPending, writeContract } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: "Your vote was successfully sent",
                });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your subsmission."
                });
            }
        }
    })

    const handleVote = async () => {
        writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'setVote',
            args: [selectedProposalId]
        })
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Vote</CardTitle>
                <CardDescription>Choose the proposal you want to vote for</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 items-end">
                    <div className="flex flex-col gap-2">
                        <Select onValueChange={(value) => setSelectedProposalId(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a proposal" />
                            </SelectTrigger>
                            <SelectContent>
                                {proposals.map((proposal) => (
                                    <SelectItem key={proposal.args.proposalId} value={proposal.args.proposalId.toString()}>
                                        {proposal.args.description}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button disabled={isPending} onClick={handleVote}>{isPending ? 'Voting...' : 'Vote'} </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Vote