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

const Proposal = ({ workflowStatus, proposals, setProposals}) => {

    const { address } = useAccount();
    const { toast } = useToast()
    const [proposalName, setProposalName] = useState('');

    const { data: hash, isPending, error, writeContract } = useWriteContract()


    const getProposals = async() => {
        const proposalsFetch = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem('event ProposalRegistered(uint proposalId, string description)'),
          fromBlock: 0n,
          toBlock: 'latest'
        })
        setProposals(proposalsFetch);
    }
    const addProposal = async() => {
        console.log("add proposal is called");
        if((proposalName).length !==0) {
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
        if(isConfirmed) {
            setProposalName('');
        }
        getProposals();
    }, [isConfirmed])



    const { data: winningProposal } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getOneProposal',
        args: [1n]
    })


{winningProposal ? console.log("result is " + winningProposal.description) : console.log("nothing to show")};
    return (
        <>
        {workflowStatus == 1 ?
(
    <Card className="max-w-md">
    <CardHeader>
      <CardTitle>Add Proposal</CardTitle>
      <CardDescription>Add a proposal that can be voted</CardDescription>
    </CardHeader>
    <CardContent>
            <div>
                <div className="flex items-center">
                    <Input placeholder="Proposal Description" onChange={(e) => setProposalName(e.target.value)} value={proposalName} />
                    <Button onClick={addProposal}>Add Proposal</Button>
                </div>
            </div>
            </CardContent>
            </Card>
    ):null}

<Card className="max-w-md">
    <CardHeader>
      <CardTitle>Proposals</CardTitle>
    </CardHeader>
            <div className="flex items-center">
            <div className="container">
            <table className="table table-striped table-bordered">
                <tbody>
                    {proposals.map(proposal =>
                        <CardContent>
                        <tr key={proposal.args.proposalId}>
                            <td>{proposal.args.description}</td>
                        </tr>
                        </CardContent>
                    )}
                </tbody>
            </table>
        </div>
            </div>
            </Card>
        </>
    )
}

export default Proposal