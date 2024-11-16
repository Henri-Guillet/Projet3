'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { contractAddress, contractAbi } from "@/constants"
import { useWriteContract } from "wagmi"

const RegisterWhitelist = () => {
    const [whitelistAddress, setWhitelistAddress] = useState("")
    const { toast } = useToast()
    const {isPending: isPending, writeContract} = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: "The address was successfully sent",
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

    const registerWhitelist = async() =>{
        writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'addVoter',
            args: [whitelistAddress]
        })  
    }

  return (
    <div className="flex gap-4 items-end">
        <div className="flex flex-col gap-2">
            <Label htmlFor="whitelistAddress">Whitelist Address</Label>
            <Input type="text" placeholder="0x1234...abcd (EVM address)" value={whitelistAddress} onChange={(e)=>setWhitelistAddress(e.target.value)}/>
        </div>
        <Button disabled={isPending} onClick={registerWhitelist}>{isPending? 'Registering...' : 'Register'} </Button>
    </div>

  )
}

export default RegisterWhitelist


