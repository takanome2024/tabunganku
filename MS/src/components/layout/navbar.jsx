import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content shadow">

      <div className="container mx-auto flex justify-between">


        <h1 className="text-xl font-bold">
          Tabunganku
        </h1>


        <div className="flex gap-4">


          <NavLink to="/">
            Dashboard
          </NavLink>


          <NavLink to="/transactions">
            Transactions
          </NavLink>


          <NavLink to="/periods">
            Periods
          </NavLink>


        </div>


      </div>

    </div>
  );
};

export default Navbar;