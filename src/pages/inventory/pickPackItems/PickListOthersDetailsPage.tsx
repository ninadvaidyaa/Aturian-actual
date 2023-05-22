import { useParams } from "react-router";

const PickListOthersDetailsPage = () => {
  const { pickListOtherlId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{pickListOtherlId}</h2>
    </div>
  );
};

export default PickListOthersDetailsPage;
