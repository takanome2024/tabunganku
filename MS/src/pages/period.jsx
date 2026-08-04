import { useEffect, useState } from "react";

import {
  getPeriods,
  deletePeriod,
} from "@/services/period.service";

import formatCurrency from "@/utils/formatCurrency";

import {
  confirmDelete,
  successAlert,
  errorAlert,
} from "@/utils/alert";



export default function PeriodPage() {


  const [periods, setPeriods] = useState([]);


  const loadPeriods = async () => {

    try {

      const result =
        await getPeriods();


      setPeriods(result.data);


    } catch(err) {

      console.error(err);

      errorAlert(
        "Gagal mengambil data periode"
      );

    }

  };




  useEffect(() => {

    loadPeriods();

  }, []);





  const handleDelete = async (id) => {


    const result =
      await confirmDelete();


    if (!result.isConfirmed) {
      return;
    }



    try {


      await deletePeriod(id);


      successAlert(
        "Period berhasil dihapus"
      );


      loadPeriods();



    } catch(err) {


      console.error(err);


      errorAlert(
        err.response?.data?.message ||
        "Gagal menghapus period"
      );


    }


  };






  return (

    <div className="space-y-6">


      <div className="flex justify-between items-center">


        <h1 className="text-3xl font-bold">

          Periods

        </h1>



        <button className="btn btn-primary">

          + Tambah

        </button>


      </div>





      <div className="overflow-x-auto">


        <table className="table table-zebra">


          <thead>

            <tr>

              <th>No</th>

              <th>Period Code</th>

              <th>Label</th>

              <th>Status</th>

              <th>Aksi</th>

            </tr>

          </thead>



          <tbody>


            {
              periods.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >

                    Belum ada periode

                  </td>

                </tr>


              ) : (


                periods.map(
                  (item, index) => (

                    <tr key={item.id}>


                      <td>

                        {index + 1}

                      </td>



                      <td>

                        {item.periodCode}

                      </td>



                      <td>

                        {item.label}

                      </td>




                      <td>


                        <div

                          className={`badge ${
                            item.status === "ACTIVE"

                            ? "badge-success"

                            : item.status === "CLOSED"

                            ? "badge-error"

                            : "badge-warning"

                          }`}

                        >

                          {item.status}

                        </div>


                      </td>




                      <td>


                        <button

                          className="btn btn-xs btn-warning mr-2"

                        >

                          Edit

                        </button>



                        <button

                          className="btn btn-xs btn-error"

                          onClick={() =>
                            handleDelete(item.id)
                          }

                        >

                          Hapus

                        </button>



                      </td>


                    </tr>


                  )

                )


              )

            }



          </tbody>


        </table>


      </div>


    </div>

  );

}