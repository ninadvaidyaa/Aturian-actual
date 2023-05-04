import { useParams } from "react-router";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{orderId}</h2>
    </div>
  );
};

export default OrderDetailPage;
