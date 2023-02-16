import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import api from "../../utils/api";

const SlideCreate = ({ updateList }) => {
  const [name, setName] = useState("Slide name");
  const [slideOrder, setSlideOrder] = useState(0);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (file) => {
    setProgress(0);
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (name && name.length > 0 && slideOrder !== null && file) {
      var formData = new FormData();
      formData.append("file", file);
      const fileObj = await api.post("/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total);
          setProgress(percentage);
        },
      });

      console.log(fileObj);

      const newSlide = await api.post("/slide", {
        name,
        order: slideOrder,
        fileId: fileObj.data.id,
      });
      updateList();
      setError("Created Successfully.");
    } else {
      setError("Check the form.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full flex flex-row justify-center">
          <div>
            <FileUploader
              multiple={false}
              handleChange={handleFileUpload}
              name="file"
              types={["JPEG", "PNG", "JPG", "MP4", "MPEG", "MOV"]}
            />
            <p className="text-center mt-2 bg-black rounded-lg text-white py-2 px-2">
              {file ? file.name : "Please upload a file"}{" "}
              {progress != 0 && `(${progress}%)`}
            </p>
          </div>
        </div>
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
            value={slideOrder}
            onChange={(e) => {
              setSlideOrder(parseInt(e.target.value));
            }}
          />
        </div>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <button
          type="submit"
          className="outline outline-1 px-4 py-2 text-lg rounded-lg hover:bg-black hover:text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SlideCreate;
