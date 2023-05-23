import { useParams } from "react-router";

const ManagePrebillDetailPage = () => {
  const { prebillId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{prebillId}</h2>
    </div>
  );
};

export default ManagePrebillDetailPage;
