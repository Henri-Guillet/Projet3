'use client'
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";
import Voting from "@/components/shared/Voting";

export default function Home() {

  const {isConnected} = useAccount()

  return(
    <>
    {isConnected ? (
      <Voting/>
    ):(
      <NotConnected/>
    )}
    </>
  )
}
