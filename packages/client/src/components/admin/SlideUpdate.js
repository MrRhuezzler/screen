import { useEffect, useState } from "react";
import api from "../../utils/api";

const SlideUpdate = ({ id, updateList }) => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (name && name.length > 0 && order !== null) {
      const updatedSlide = await api.put(`/slide/${id}`, {
        name,
        order: order,
        isActive: active,
      });
      updateList();
      setError("updated Successfully.");
    } else {
      setError("Check the form.");
    }
  };

  const fetchSlide = async () => {
    if (id) {
      const response = await api.get(`/slide/${id}`);
      const data = response.data;
      setName(data.name);
      setOrder(data.order);
      setActive(data.isActive);
    }
  };

  useEffect(() => {
    fetchSlide();
  }, [id]);

  if (!id) {
    return <div>Select a slide to update or delete.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="mb-2">Name</h1>
          <input
            className="py-2 px-2 flex-1 outline w-full"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="w-full mb-4">
          <h1 className="mb-2">Order</h1>
          <input
            type="number"
            className="flex-1 outline w-full px-2 py-2"
            value={order}
            onChange={(e) => {
              setOrder(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="w-full mb-4">
          <h1 className="mb-2">Active</h1>
          <input
            type="checkbox"
            // className="flex-1 outline w-full px-2 py-2"
            // value={active}
            checked={active}
            onChange={(e) => {
              setActive(!active);
            }}
          />
        </div>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <button
          type="submit"
          className="outline outline-1 px-4 py-2 text-lg rounded-lg hover:bg-black hover:text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default SlideUpdate;
