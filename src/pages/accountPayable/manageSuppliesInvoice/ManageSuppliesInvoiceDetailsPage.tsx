import { useParams } from "react-router";

const ManagerSupplierInvoiceDetailPage = () => {
  const { invoiceId } = useParams();

  return (
    <div className="flex flex-1 flex-col">
      <h2>{invoiceId}</h2>
    </div>
  );
};

export default ManagerSupplierInvoiceDetailPage;
