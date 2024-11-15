'use client';
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast"

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'

import { contractAddress, contractAbi } from "@/constants";

import Informations from "./Informations";

const Proposal = ({ refetch, getEvents }) => {

    const { address } = useAccount();
    const { toast } = useToast()
    const [proposalName, setProposalName] = useState('');

    const { data: hash, isPending, error, writeContract } = useWriteContract()

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
            refetch()
            setProposalName('');
            getEvents();
        }
    }, [isConfirmed])

    return (
        <>
            <h2 className="text-4xl font-extrabold mb-4">Proposal</h2>
            <Informations hash={hash} isConfirming={isConfirming} error={error} isConfirmed={isConfirmed} />
            <div className="flex items-center">
                <Input placeholder="Proposal Description" onChange={(e) => setProposalName(e.target.value)} value={proposalName} />
                <Button onClick={addProposal} className="hover:bg-gray-600 bg-gray-700 text-white">Add Proposal</Button>
                {console.log("value of proposal is : ", proposalName)}
            </div>
        </>
    )
}

export default Proposal