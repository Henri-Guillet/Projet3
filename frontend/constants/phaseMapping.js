const phaseMapping = {
    0: {
      buttonText: "Start Proposals Registering",
      nextPhase: 1,
      nextPhaseFunction: "startProposalsRegistering",
      description: "Registering voters",
    },
    1: {
      buttonText: "End Proposals Registering",
      nextPhase: 2,
      nextPhaseFunction: "endProposalsRegistering",
      description: "Proposals are being registered",
    },
    2: {
      buttonText: "Start Voting Session",
      nextPhase: 3,
      nextPhaseFunction: "startVotingSession",
      description: "Proposals registration ended",
    },
    3: {
      buttonText: "End Voting Session",
      nextPhase: 4,
      nextPhaseFunction: "endVotingSession",
      description: "Voting session is live",
    },
    4: {
      buttonText: "Tally Votes",
      nextPhase: 5,
      nextPhaseFunction: "tallyVotes",
      description: "Voting session has ended",
    },
    5: {
      buttonText: "Finalize Results",
      nextPhase: null,
      nextPhaseFunction: null,
      description: "Votes are being tallied",
    },
  };
  
  export default phaseMapping;
  