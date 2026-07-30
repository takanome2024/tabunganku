import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transaction.service";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

const loadTransactions = async () => {
  try {
    const result = await getTransactions();

    console.log(result);

    setTransactions(result.data.items);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">
        Transactions
      </h1>

      <pre>
        {JSON.stringify(transactions, null, 2)}
      </pre>
    </div>
  );
}