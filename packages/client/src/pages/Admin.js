import { useEffect, useState } from "react";
import Slide from "../components/admin/Slide";
import SlideController from "../components/admin/SlideController";
import api from "../utils/api";

const Admin = () => {
  const [slides, setSlides] = useState([]);

  const [navItem, setNavItem] = useState(0);
  const [editId, setEditId] = useState(null);

  const fetchSlides = async () => {
    const response = await api.get("/slide");
    setSlides(response.data);
  };

  const onClickSlide = (id) => {
    setEditId(id);
    setNavItem(1);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className="flex-1 flex flex-row overflow-y-auto">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {slides.map((v, index) => (
          <Slide
            key={index}
            {...v}
            onClickSlide={onClickSlide}
            updateList={fetchSlides}
          />
        ))}
      </div>
      <div className="flex-1 px-4">
        <div className="flex flex-row space-x-4 py-4">
          <button
            className="bg-black text-white px-2 py-2 rounded-lg hover:bg-white hover:text-black hover:outline hover:outline-1 hover:outline-black"
            onClick={(e) => {
              setNavItem(0);
              setEditId(null);
            }}
          >
            Create
          </button>
          <button
            className="bg-black text-white px-2 py-2 rounded-lg hover:bg-white hover:text-black hover:outline hover:outline-1 hover:outline-black"
            onClick={(e) => {
              setNavItem(1);
            }}
          >
            Update
          </button>
        </div>
        <div className="">
          <SlideController
            navItem={navItem}
            data={{
              create: { updateList: fetchSlides },
              update: { id: editId, updateList: fetchSlides },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
