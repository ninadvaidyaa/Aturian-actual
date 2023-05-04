export interface CustomerList {
  id: number;
  name: string;
  logo: string;
  aliases: string[];
  salesperson: {
    id: number;
    number: string;
    name: string;
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}
