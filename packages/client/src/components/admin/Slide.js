import { MdDelete } from "react-icons/md";
import api from "../../utils/api";

const Slide = ({
  id,
  name,
  order,
  isActive,
  file,
  onClickSlide,
  updateList,
}) => {
  const deleteSlide = async (id) => {
    try {
      const slide = await api.delete(`/slide/${id}`);
      updateList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={(e) => {
        console.log(id);
        onClickSlide(id);
      }}
      className="font-pops w-full flex flex-row items-center space-x-4 py-4 px-10 border border-black rounded-lg group hover:text-white hover:bg-black cursor-pointer"
    >
      <div className="flex-1">
        <p className="text-gray-400">ID</p>
        <p className="break-all">{id}</p>
      </div>
      <div className="flex-4">
        <p className="text-gray-400">Name</p>
        <p className="break-all">{name}</p>
      </div>
      <div className="flex-4">
        <p className="text-gray-400">Order</p>
        <p className="break-all">{order}</p>
      </div>
      <div className="flex-4">
        <p className="text-gray-400">File ID</p>
        <p className="break-all">{file.id}</p>
      </div>
      <div className="flex-4">
        <p className="text-gray-400">mediaType</p>
        <p className="break-all">{file.mediaType}</p>
      </div>
      <div className="flex-4">
        <p className="text-gray-400">Active</p>
        <p className="break-all">{isActive ? "True" : "False"}</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400">Delete</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteSlide(id);
          }}
          className="text-red-500 text-2xl"
        >
          <MdDelete></MdDelete>
        </button>
      </div>
    </div>
  );
};

export default Slide;
// "id": 1,
//         "name": "SLIDE 1",
//         "order": 0,
//         "isActive": true,
//         "file": {
//             "id": "cbb7bb0c-3471-4a02-a2e3-226ed7d2c1ba",
//             "mediaType": "IMAGE",
//             "path": "D:\\Projects\\screen\\packages\\server\\public\\cbb7bb0c-3471-4a02-a2e3-226ed7d2c1ba.png",
//             "url": "http://localhost:8000/public/cbb7bb0c-3471-4a02-a2e3-226ed7d2c1ba.png",
//             "fileName": "aa.png",
//             "mimeType": "image/png",
//             "size": 328945,
//             "slideId": 1
//         }
