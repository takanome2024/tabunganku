import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboard.service";
import formatCurrency from "@/utils/formatCurrency";
import SummaryCard from "@/components/SummaryCard";

export default function Home() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await getDashboard();

      setDashboard(result.data);

    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
<SummaryCard
  title="Saldo"
  value={formatCurrency(dashboard.balance)}
/>

<SummaryCard
  title="Total Deposit"
  value={formatCurrency(dashboard.totalDeposit)}
/>

<SummaryCard
  title="Total Withdraw"
  value={formatCurrency(dashboard.totalWithdraw)}
/>
      <pre>
        {JSON.stringify(dashboard, null, 2)}
      </pre>
    </div>
  );
}