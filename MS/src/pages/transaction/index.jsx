import { useEffect, useState } from "react";
import {
  getTransactions,
  deleteTransaction,
} from "@/services/transaction.service";

import { getPeriods } from "@/services/period.service";

import formatCurrency from "@/utils/formatCurrency";

import TransactionForm from "@/components/transaction/TransactionForm";

import {
  confirmDelete,
  successAlert,
  errorAlert,
} from "@/utils/alert";


export default function TransactionPage() {


  const [transactions, setTransactions] = useState([]);
  const [periods, setPeriods] = useState([]);


  const [filters, setFilters] = useState({
    periodId: "",
    transactionType: "ALL",
    search: "",
  });


  const [searchInput, setSearchInput] = useState("");


  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
    totalData: 0,
  });


  const [openModal, setOpenModal] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);



  useEffect(() => {
    loadPeriods();
  }, []);



  useEffect(() => {
    loadTransactions(1);
  }, [filters]);



  useEffect(() => {

    const timer = setTimeout(() => {

      setFilters((prev) => ({
        ...prev,
        search: searchInput,
      }));

    }, 500);


    return () => clearTimeout(timer);

  }, [searchInput]);





  const loadPeriods = async () => {

    try {

      const result = await getPeriods();

      setPeriods(result.data || []);

    } catch (err) {

      errorAlert(
        "Gagal mengambil data periode"
      );

    }

  };





  const loadTransactions = async (
    page = 1
  ) => {

    try {

      const result =
        await getTransactions({

          ...filters,

          page,

          limit: 5,

        });



      setTransactions(
        result.data || []
      );


      setPagination(
        result.pagination
      );


    } catch (err) {

      console.error(err);

      errorAlert(
        "Gagal mengambil data transaction"
      );

    }

  };






  const handleDelete = async (
    id
  ) => {


    const result =
      await confirmDelete();


    if (!result.isConfirmed)
      return;



    try {

      await deleteTransaction(id);


      successAlert(
        "Transaction berhasil dihapus"
      );


      loadTransactions(
        pagination.currentPage
      );


    } catch (err) {

      errorAlert(
        "Gagal menghapus transaction"
      );

    }

  };






  const handleEdit = (
    item
  ) => {

    setSelectedTransaction(item);

    setOpenModal(true);

  };






  return (

    <div className="space-y-6">


      <div className="flex justify-between items-center">


        <h1 className="text-3xl font-bold">
          Transactions
        </h1>


        <button

          className="btn btn-primary"

          onClick={() => {

            setSelectedTransaction(null);

            setOpenModal(true);

          }}

        >
          + Tambah
        </button>


      </div>





      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        <select

          className="select select-bordered"

          value={filters.periodId}

          onChange={(e)=>

            setFilters((prev)=>({

              ...prev,

              periodId:e.target.value,

            }))

          }

        >

          <option value="">
            Semua Periode
          </option>


          {periods.map((item)=>(

            <option
              key={item.id}
              value={item.id}
            >
              {item.label}
            </option>

          ))}


        </select>





        <select

          className="select select-bordered"

          value={filters.transactionType}

          onChange={(e)=>

            setFilters((prev)=>({

              ...prev,

              transactionType:e.target.value,

            }))

          }

        >

          <option value="ALL">
            Semua Tipe
          </option>


          <option value="DEPOSIT">
            Deposit
          </option>


          <option value="WITHDRAW">
            Withdraw
          </option>


        </select>





        <input

          type="text"

          className="input input-bordered"

          placeholder="Cari remark..."

          value={searchInput}

          onChange={(e)=>

            setSearchInput(
              e.target.value
            )

          }

        />


      </div>






      <div className="overflow-x-auto">

        <table className="table table-zebra">


          <thead>

            <tr>

              <th>No</th>

              <th>Periode</th>

              <th>Tipe</th>

              <th>Nominal</th>

              <th>Remark</th>

              <th>Tanggal</th>

              <th>Aksi</th>

            </tr>

          </thead>



          <tbody>


          {
            transactions.length === 0 ?

            (

              <tr>

                <td
                  colSpan="7"
                  className="text-center"
                >
                  Belum ada transaksi
                </td>

              </tr>


            )


            :


            transactions.map(
              (item,index)=>(

              <tr key={item.id}>


                <td>

                {
                  (
                    pagination.currentPage - 1
                  )
                  *
                  pagination.limit
                  +
                  index
                  +
                  1
                }

                </td>


                <td>
                  {item.period?.label || "-"}
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

                    {item.transactionType}

                  </div>

                </td>


                <td>
                  {formatCurrency(item.amount)}
                </td>


                <td>
                  {item.remarks || "-"}
                </td>


                <td>

                  {
                    new Date(
                      item.createdAt
                    )
                    .toLocaleDateString(
                      "id-ID"
                    )
                  }

                </td>



                <td>


                  <button

                    className="btn btn-xs btn-warning mr-2"

                    onClick={()=>
                      handleEdit(item)
                    }

                  >
                    Edit
                  </button>



                  <button

                    className="btn btn-xs btn-error"

                    onClick={()=>
                      handleDelete(item.id)
                    }

                  >
                    Hapus
                  </button>


                </td>


              </tr>

            ))

          }


          </tbody>


        </table>


      </div>






      <div className="flex justify-center gap-3">


        <button

          className="btn"

          disabled={
            pagination.currentPage <= 1
          }

          onClick={()=>

            loadTransactions(
              pagination.currentPage - 1
            )

          }

        >

          Previous

        </button>





        <div className="btn btn-ghost">

          Page {pagination.currentPage}
          /
          {pagination.totalPages}

        </div>





        <button

          className="btn"

          disabled={
            pagination.currentPage >=
            pagination.totalPages
          }

          onClick={()=>

            loadTransactions(
              pagination.currentPage + 1
            )

          }

        >

          Next

        </button>



      </div>





      <TransactionForm

        open={openModal}

        onClose={() => {

          setOpenModal(false);

          setSelectedTransaction(null);

        }}

        onSuccess={() => {

          setOpenModal(false);

          loadTransactions(
            pagination.currentPage
          );

        }}

        transaction={selectedTransaction}

      />



    </div>

  );

}