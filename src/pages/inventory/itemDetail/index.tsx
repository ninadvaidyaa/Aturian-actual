import { useParams } from "react-router";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{itemId}</h2>
    </div>
  );
};

export default ItemDetailPage;