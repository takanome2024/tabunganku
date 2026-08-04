import { useEffect, useState } from "react";

import { getDashboard } from "@/services/dashboard.service";

import formatCurrency from "@/utils/formatCurrency";

import SummaryCard from "@/components/SummaryCard";


export default function Home() {


  const [dashboard, setDashboard] =
    useState(null);


  const [loading, setLoading] =
    useState(true);





  useEffect(() => {

    loadDashboard();

  }, []);





  const loadDashboard = async () => {

    try {

      const result =
        await getDashboard();


      setDashboard(
        result.data
      );


    } catch (err) {

      console.error(err);


    } finally {

      setLoading(false);

    }

  };






  if (loading) {

    return (

      <div className="flex justify-center py-20">

        <span className="loading loading-spinner loading-lg" />

      </div>

    );

  }





  if (!dashboard) {

    return (

      <div className="text-center py-20">

        Data dashboard tidak tersedia

      </div>

    );

  }






  return (

    <div className="space-y-8">


      <h1 className="text-3xl font-bold">

        Dashboard

      </h1>






      {/* SUMMARY */}


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


        <SummaryCard

          title="Saldo"

          value={
            formatCurrency(
              dashboard.balance
            )
          }

        />



        <SummaryCard

          title="Total Deposit"

          value={
            formatCurrency(
              dashboard.totalDeposit
            )
          }

        />



        <SummaryCard

          title="Total Withdraw"

          value={
            formatCurrency(
              dashboard.totalWithdraw
            )
          }

        />



        <SummaryCard

          title="Total Transaction"

          value={
            dashboard.totalTransaction
          }

        />


      </div>







      {/* LATEST TRANSACTION */}



      <div className="card bg-base-100 shadow">


        <div className="card-body">


          <h2 className="card-title">

            Transaksi Terbaru

          </h2>





          <div className="overflow-x-auto">


            <table className="table table-zebra">


              <thead>

                <tr>

                  <th>
                    Periode
                  </th>

                  <th>
                    Tipe
                  </th>

                  <th>
                    Nominal
                  </th>

                  <th>
                    Remark
                  </th>

                </tr>

              </thead>





              <tbody>


              {
                dashboard.latestTransactions.length === 0 ?


                (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center"
                    >

                      Belum ada transaksi

                    </td>

                  </tr>


                )

                :


                dashboard.latestTransactions.map(
                  (item) => (


                    <tr key={item.id}>


                      <td>

                        {
                          item.period
                        }

                      </td>




                      <td>


                        <div

                          className={`badge ${
                            item.transactionType === "DEPOSIT"

                            ?

                            "badge-success"

                            :

                            "badge-error"

                          }`}

                        >

                          {
                            item.transactionType
                          }

                        </div>


                      </td>





                      <td>

                        {
                          formatCurrency(
                            item.amount
                          )
                        }

                      </td>





                      <td>

                        {
                          item.remarks || "-"
                        }

                      </td>



                    </tr>


                  )

                )

              }


              </tbody>


            </table>


          </div>


        </div>


      </div>


    </div>

  );

}