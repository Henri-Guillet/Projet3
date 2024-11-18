'use client'
import AdminWorkflow from './AdminWorkflow'
import Vote from './Vote'
import { useState, useEffect } from "react"
import { useAccount, useReadContract } from "wagmi"
import { contractAddress, contractAbi } from "@/constants"
import phaseMapping from "@/constants/phaseMapping";
import Proposal from './Proposal'
import VotingResults from './VotingResults'

const Voting = () => {

  const { address } = useAccount()
  const [proposals, setProposals] = useState([])

  // Workflow Status
  const [workflowStatus, setWorkflowStatus] = useState(null)
  const { data: fetchedWorkflowStatus } = useReadContract({
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
    <div className="grid grid-cols-2 gap-4">
      {address === ownerAddress ? (
        <div className="col-span-1">
          <AdminWorkflow
            workflowStatus={workflowStatus}
            setWorkflowStatus={setWorkflowStatus}
            phaseMapping={phaseMapping}
          />
        </div>
      ) : null}

      <div className="col-span-1">
        <Proposal
          workflowStatus={workflowStatus}
          proposals={proposals}
          setProposals={setProposals}
        />
      </div>

      {voterStruct?.isRegistered && workflowStatus === 3 ? (
        <div className="col-span-1">
          <Vote proposals={proposals} />
        </div>
      ) : null}

      {workflowStatus == 5 ? (
        <div className="col-span-1">
          <VotingResults />
        </div>
      ) : null}



    </div>
  );

}

export default Voting