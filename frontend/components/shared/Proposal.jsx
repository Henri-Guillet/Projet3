'use client';
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { publicClient } from "@/utils/client"
import { useToast } from "@/hooks/use-toast"

import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi'
import { parseAbiItem } from "viem"

import { contractAddress, contractAbi } from "@/constants";

const Proposal = () => {

    const { address } = useAccount();
    const { toast } = useToast()
    const [proposalName, setProposalName] = useState('');

    const { data: hash, isPending, error, writeContract } = useWriteContract()

    const [proposals, setProposals] = useState([])

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



    return (
        <>
            <h2 className="text-4xl font-extrabold mb-4">Add Proposal</h2>
            <div className="flex items-center">
                <Input placeholder="Proposal Description" onChange={(e) => setProposalName(e.target.value)} value={proposalName} />
                <Button onClick={addProposal} className="hover:bg-gray-600 bg-gray-700 text-white">Add Proposal</Button>
            </div>
            {console.log(proposals)}
            <h2 className="text-4xl font-extrabold mb-4">Proposals</h2>
            <div className="flex items-center">

            <div className="container">
            <table className="table table-striped table-bordered">
                <tbody>
                    {proposals.map(proposal =>
                        <tr key={proposal.args.proposalId}>
                            <td>{proposal.args.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
            </div>
        </>
    )
}

export default Proposal