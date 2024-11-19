'use client';
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { publicClient } from "@/utils/client"
import { useToast } from "@/hooks/use-toast"

import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi'
import { parseAbiItem } from "viem"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


import { contractAddress, contractAbi } from "@/constants";

const Proposal = ({ workflowStatus, proposals, setProposals }) => {

    const { address } = useAccount();
    const { toast } = useToast()
    const [proposalName, setProposalName] = useState('');

    const { data: hash, isPending, error, writeContract } = useWriteContract()


    const getProposals = async () => {
        const proposalsFetch = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event ProposalRegistered(uint proposalId, string description)'),
            fromBlock: 2770055n,
            toBlock: 'latest'
        })
        setProposals(proposalsFetch);
    }
    const addProposal = async () => {
        console.log("add proposal is called");
        if ((proposalName).length !== 0) {
            writeContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'addProposal',
                args: [proposalName],
                account: address
            })
        }
        else {
            toast({
                title: "Error",
                description: "Proposal can't be empty",
                className: 'bg-red-600'
            })
        }
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    useEffect(() => {
        if (isConfirmed) {
            setProposalName('');
        }
        getProposals();
    }, [isConfirmed])



    return (
        <>
            {workflowStatus == 1 ?
                (
                    <Card >
                        <CardHeader>
                            <CardTitle>Add Proposal</CardTitle>
                            <CardDescription>Add a proposal that can be voted</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="flex items-center gap-4">
                                    <Input placeholder="Proposal Description" onChange={(e) => setProposalName(e.target.value)} value={proposalName} />
                                    <Button onClick={addProposal}>Add Proposal</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : null}

            <Card >
                <CardHeader>
                    <CardTitle>List of Proposals</CardTitle>
                </CardHeader>

                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                        {proposals.map((proposal) => (
                            <li key={proposal.args.proposalId.toString()} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                {proposal.args.description}
                            </li>
                        ))}
                    </ul>
                </CardContent>

            </Card >
        </>
    )
}

export default Proposal