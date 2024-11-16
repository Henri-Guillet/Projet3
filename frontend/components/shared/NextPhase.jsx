'use client'
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { contractAddress, contractAbi } from "@/constants"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Label } from "@/components/ui/label"


const NextPhase = ({workflowStatus, phaseMapping, setWorkflowStatus }) => {

    const { buttonText, nextPhase, nextPhaseFunction } = phaseMapping[workflowStatus] || {};

    const { toast } = useToast()

    const { data: hash, isPending: isPending, writeContract } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: "Your transaction was successfully sent",
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

    const { isSuccess } = useWaitForTransactionReceipt({ hash })

    const moveToNextPhase = async () => {
        writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: nextPhaseFunction
        })
    }

    useEffect(()=>{
        if(isSuccess && nextPhase !== null) setWorkflowStatus(nextPhase)
    }, [isSuccess])

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="nextPhase">Move on to the next phase</Label>
            <Button  disabled={isPending} onClick={moveToNextPhase}>{isPending ? `${buttonText}...` : `${buttonText}`} </Button>
        </div>
    )
}

export default NextPhase