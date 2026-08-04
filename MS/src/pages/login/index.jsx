import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "@/services/auth.service";


export default function LoginPage() {


  const navigate = useNavigate();


  const [form, setForm] = useState({

    username: "",

    password: "",

  });



  const [loading, setLoading] =
    useState(false);



  const [error, setError] =
    useState("");





  const handleChange = (e) => {


    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });


  };







  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      setLoading(true);

      setError("");



      const result =
        await login(form);





      localStorage.setItem(

        "token",

        result.data.token

      );




      localStorage.setItem(

        "user",

        JSON.stringify(
          result.data.user
        )

      );





      navigate("/");




    } catch (err) {


      console.error(err);



      setError(

        err.response?.data?.message ||

        "Username atau password salah"

      );



    } finally {


      setLoading(false);


    }


  };







  return (


    <div className="min-h-screen flex justify-center items-center bg-base-200">


      <form

        onSubmit={handleSubmit}

        className="w-96 bg-base-100 shadow rounded p-6"

      >


        <h1 className="text-2xl font-bold mb-5">

          Login

        </h1>





        {
          error && (

            <div className="alert alert-error mb-4">

              {error}

            </div>

          )
        }






        <div className="mb-4">


          <label className="label">

            <span className="label-text">

              Username

            </span>

          </label>




          <input


            className="input input-bordered w-full"


            name="username"


            value={form.username}


            onChange={handleChange}


          />


        </div>







        <div className="mb-5">


          <label className="label">

            <span className="label-text">

              Password

            </span>

          </label>




          <input


            className="input input-bordered w-full"


            type="password"


            name="password"


            value={form.password}


            onChange={handleChange}


          />


        </div>







        <button


          type="submit"


          disabled={loading}


          className="btn btn-primary w-full"


        >


          {
            loading
            ?
            "Loading..."
            :
            "Login"
          }


        </button>




      </form>


    </div>


  );

}