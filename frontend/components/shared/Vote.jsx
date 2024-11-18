'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { contractAddress, contractAbi } from "@/constants"
import { useWriteContract, useReadContract } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const Vote = () => {

    const [proposalID, setProposalID] = useState("")
    const { toast } = useToast()
    const {isPending: isPending, writeContract} = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: "The proposal ID was successfully sent",
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

    const vote = async() =>{
        writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'setVote',
            args: [proposalID]
        })  
    }
    
    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Vote</CardTitle>
                <CardDescription>Enter the proposal ID you want to vote for</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 items-end">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="proposalID">Proposal ID</Label>
                        <Input type="number" placeholder="1" value={proposalID} onChange={(e) => setProposalID(e.target.value)} />
                    </div>
                    <Button disabled={isPending} onClick={vote}>{isPending ? 'Voting...' : 'Vote'} </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Vote