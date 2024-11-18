'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { contractAddress, contractAbi } from "@/constants"
import { useState, useEffect } from "react"
import { useReadContract } from "wagmi"

const VotingResults = () => {

    const { data: winningProposalId } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'winningProposalID'
    })

    const { data: winningProposal } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getOneProposal',
        args: [winningProposalId]
    })


    return (
        <Card>
            <CardHeader>
                <CardTitle>Winning Proposal</CardTitle>
                <CardDescription>Discover the proposal that received the most votes during the session.</CardDescription>
            </CardHeader>
            <CardContent>
                {winningProposal ? (
                    <p className="text-lg font-medium">
                        <strong>Description:</strong> {winningProposal.description} <br />
                        <strong>Votes:</strong> {winningProposal.voteCount.toString()}
                    </p>
                ) : (
                    <p className="text-gray-500">Fetching the winning proposal details...</p>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">
                    Stay tuned for the next voting session!
                </p>
            </CardFooter>
        </Card>
    )
}

export default VotingResults