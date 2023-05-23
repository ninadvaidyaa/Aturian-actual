import { useParams } from "react-router";

const QuotesDetailPage = () => {
  const { quoteId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{quoteId}</h2>
    </div>
  );
};

export default QuotesDetailPage;
