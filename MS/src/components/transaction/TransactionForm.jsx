import { useEffect, useState } from "react";
import { formatNumberInput } from "@/utils/formatNumberInput";

import {
  createTransaction,
  updateTransaction,
} from "@/services/transaction.service";

import { getPeriods } from "@/services/period.service";

import {
  successAlert,
  errorAlert,
  warningAlert,
} from "@/utils/alert";


export default function TransactionForm({
  open,
  onClose,
  onSuccess,
  transaction,
}) {


  const initialForm = {
    periodId: "",
    transactionType: "DEPOSIT",
    amount: "",
    remarks: "",
  };


  const [form, setForm] = useState(
    initialForm
  );


  const [periods, setPeriods] = useState([]);

  const [loadingPeriods, setLoadingPeriods] =
    useState(false);

  const [loadingSubmit, setLoadingSubmit] =
    useState(false);




  const resetForm = () => {

    setForm({
      ...initialForm,
    });

  };





  const loadPeriods = async () => {

    try {

      setLoadingPeriods(true);


      const result =
        await getPeriods();


      setPeriods(
        result.data || []
      );


    } catch (err) {

      console.error(err);

      errorAlert(
        "Gagal mengambil data periode"
      );


    } finally {

      setLoadingPeriods(false);

    }

  };





  useEffect(() => {

    if (!open) return;


    loadPeriods();


  }, [open]);






  useEffect(() => {

    if (!open) return;



    if (transaction) {


      setForm({

        periodId:
          String(transaction.periodId),

        transactionType:
          transaction.transactionType,

        amount:
          String(transaction.amount),

        remarks:
          transaction.remarks || "",

      });



    } else {


      resetForm();


    }


  }, [
    transaction,
    open,
  ]);







  const handleAmountChange = (e) => {


    const value =
      e.target.value.replace(/\D/g, "");


    setForm((prev) => ({

      ...prev,

      amount: value,

    }));

  };








  const handleSubmit = async () => {


    if (!form.periodId) {

      return warningAlert(
        "Pilih periode"
      );

    }


    if (!form.amount) {

      return warningAlert(
        "Nominal wajib diisi"
      );

    }


    if (
      Number(form.amount) <= 0
    ) {

      return warningAlert(
        "Nominal harus lebih dari 0"
      );

    }




    if (
      form.transactionType === "WITHDRAW" &&
      !form.remarks.trim()
    ) {

      return warningAlert(
        "Remark wajib diisi untuk Withdraw"
      );

    }




    try {


      setLoadingSubmit(true);



      const payload = {

        periodId:
          Number(form.periodId),

        transactionType:
          form.transactionType,

        amount:
          Number(form.amount),

        remarks:
          form.remarks,

      };





      if (transaction) {


        await updateTransaction(
          transaction.id,
          payload
        );


        successAlert(
          "Transaction berhasil diupdate"
        );



      } else {


        await createTransaction(
          payload
        );


        successAlert(
          "Transaction berhasil disimpan"
        );


      }




      resetForm();

      onClose();



      if (onSuccess) {

        onSuccess();

      }




    } catch (err) {


      console.error(
        err.response?.data || err
      );



      errorAlert(

        err.response?.data?.message ||

        (
          transaction
            ? "Gagal mengupdate transaction"
            : "Gagal menyimpan transaction"
        )

      );



    } finally {


      setLoadingSubmit(false);


    }


  };







  return (

    <dialog
      className={`modal ${
        open ? "modal-open" : ""
      }`}
    >

      <div className="modal-box">


        <h3 className="font-bold text-lg mb-5">

          {
            transaction
              ? "Edit Transaction"
              : "Tambah Transaction"
          }

        </h3>





        <div className="mb-3">


          <label className="label">

            <span className="label-text">
              Transaction Type
            </span>

          </label>



          <select

            className="select select-bordered w-full"

            value={form.transactionType}

            onChange={(e) =>
              setForm((prev)=>({

                ...prev,

                transactionType:
                  e.target.value,

              }))
            }

          >

            <option value="DEPOSIT">
              Deposit
            </option>


            <option value="WITHDRAW">
              Withdraw
            </option>


          </select>


        </div>






        <div className="mb-3">


          <label className="label">

            <span className="label-text">
              Periode
            </span>

          </label>



          <select

            disabled={loadingPeriods}

            className="select select-bordered w-full"

            value={form.periodId}

            onChange={(e)=>

              setForm((prev)=>({

                ...prev,

                periodId:
                  e.target.value,

              }))

            }

          >

            <option value="">

              {
                loadingPeriods
                  ? "Loading..."
                  : "Pilih Periode"
              }

            </option>



            {
              periods.map((item)=>(

                <option
                  key={item.id}
                  value={item.id}
                >

                  {item.label}

                </option>

              ))
            }


          </select>


        </div>






        <div className="mb-3">


          <label className="label">

            <span className="label-text">
              Nominal
            </span>

          </label>




          <input

            type="text"

            inputMode="numeric"

            className="input input-bordered w-full"

            placeholder="Nominal"

            value={
              formatNumberInput(
                form.amount
              )
            }

            onChange={
              handleAmountChange
            }

          />


        </div>







        <div className="mb-3">


          <label className="label">

            <span className="label-text">
              Remark
            </span>

          </label>




          <textarea

            className="textarea textarea-bordered w-full"

            placeholder="Remark"

            value={form.remarks}

            onChange={(e)=>

              setForm((prev)=>({

                ...prev,

                remarks:
                  e.target.value,

              }))

            }

          />


        </div>






        <div className="modal-action">


          <button

            type="button"

            className="btn"

            disabled={loadingSubmit}

            onClick={() => {

              resetForm();

              onClose();

            }}

          >

            Tutup

          </button>





          <button

            type="button"

            className="btn btn-primary"

            disabled={loadingSubmit}

            onClick={handleSubmit}

          >

            {
              loadingSubmit

              ?

              (
                transaction
                  ? "Mengupdate..."
                  : "Menyimpan..."
              )

              :

              (
                transaction
                  ? "Update"
                  : "Simpan"
              )
            }


          </button>


        </div>



      </div>


    </dialog>

  );

}