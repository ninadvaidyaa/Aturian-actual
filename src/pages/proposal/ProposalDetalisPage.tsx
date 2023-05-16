import { useParams } from "react-router";

const ProposalDetailPage = () => {
  const { proposalId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{proposalId}</h2>
    </div>
  );
};

export default ProposalDetailPage;
