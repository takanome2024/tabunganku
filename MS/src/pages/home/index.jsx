import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";

const Home = () => {
  return (
    <div className="container mx-auto max-w-3xl py-10 px-5">

      <PageHeader
        title="Family Saving"
        subtitle="Catat seluruh transaksi tabungan keluarga."
      />

      <Card title="Selamat Datang">

        <p>
          Sistem ini digunakan untuk mencatat seluruh
          transaksi tabungan keluarga.
        </p>

      </Card>

    </div>
  );
};

export default Home;