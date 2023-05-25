import { useParams } from "react-router-dom";

const SupplierDetail = () => {
  const { supplierId } = useParams();
  return (
    <div className="flex flex-1 flex-col">
      <h2>{supplierId}</h2>
    </div>
  );
};

export default SupplierDetail;
