'use client'
import AdminWorkflow from './AdminWorkflow'
import { useState, useEffect } from "react"
import { useAccount, useReadContract } from "wagmi"
import { contractAddress, contractAbi } from "@/constants"
import phaseMapping from "@/constants/phaseMapping";
import Proposal from './Proposal'

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

  return (
    <div>
      {address == ownerAddress? (<AdminWorkflow workflowStatus={workflowStatus} setWorkflowStatus={setWorkflowStatus} phaseMapping={phaseMapping}/>) : null}
      <Proposal workflowStatus={workflowStatus} />
    </div>
  )
}

export default Voting