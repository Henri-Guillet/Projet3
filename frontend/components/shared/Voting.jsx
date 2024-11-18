'use client'
import AdminWorkflow from './AdminWorkflow'
import Vote from './Vote'
import { useState, useEffect } from "react"
import { useAccount, useReadContract } from "wagmi"
import { contractAddress, contractAbi } from "@/constants"
import phaseMapping from "@/constants/phaseMapping";

const Voting = () => {

  const {address} = useAccount()

  // Workflow Status
  const [workflowStatus, setWorkflowStatus] = useState(null)
  const { data: fetchedWorkflowStatus  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'workflowStatus'
  })        

  useEffect(() => {
    if (fetchedWorkflowStatus !== undefined) {
      setWorkflowStatus(fetchedWorkflowStatus) 
    }
  }, [fetchedWorkflowStatus]);

  //Retrieve Owner address
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'owner',
  });

  // Display Vote component only when needed
  const { data: voterStruct } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getVoter',
    args: [address],
  });


  return (
    <div>
      {address == ownerAddress? 
      (<AdminWorkflow workflowStatus={workflowStatus} setWorkflowStatus={setWorkflowStatus} phaseMapping={phaseMapping}/>) 
      : null}
      {voterStruct?.isRegistered && workflowStatus=== 4? <Vote /> : null}
    </div>
  )
}

export default Voting