import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="py-2 px-2 bg-black text-white text-center text-3xl">
        <p className="border border-white py-2 px-2 font-pops">
          Department of Applied Mathematics and Computational Sciences
        </p>
      </div>
      <Outlet />
      <div className="py-2 px-2 bg-black text-white text-center text-3xl">
        <p className="border border-white py-2 px-2 font-pops">
          Stay ahead, and be relevant
        </p>
      </div>
    </div>
  );
};

export default Home;
