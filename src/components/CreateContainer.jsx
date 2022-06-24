import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/staticData";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";

import { useDispatch } from "react-redux";
import { setFoodItems } from "../reducers/foodSlice";

const CreateContainer = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopular, setIsPopular] = useState(false);

  const dispatch = useDispatch();

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
    });
    setFields(true);
    setMsg("Image Deleted Successfully");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
      setIsLoading(false);
    }, 4000);
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!name || !category || !price || !imageAsset) {
        setFields(true);
        setMsg("Required Fields Are Empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          name: name,
          imageURL: imageAsset,
          category: category,
          popular: isPopular,
          qty: 1,
          price: price,
        };
        saveItem(data, category);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setName("");
    setImageAsset(null);
    setPrice("");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch(setFoodItems(data));
    });
  };

  const uploadImage = (e) => {
    if (category) {
      setIsLoading(true);
      const imageFile = e.target.files[0];
      const storageRef = ref(
        storage,
        `${category}s/${Date.now()}-${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
          setFields(true);
          setMsg("Error while uploading : Try AGain 🙇");
          setAlertStatus("danger");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset(downloadURL);
            setIsLoading(false);
            setFields(true);
            setMsg("Image uploaded successfully 😊");
            setAlertStatus("success");
            setTimeout(() => {
              setFields(false);
            }, 4000);
          });
        }
      );
    } else {
      setFields(true);
      setMsg("Please Choose A Category");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  return (
    <div className="z-[100] w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger" ? "bg-red-400" : "bg-emerald-400"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
          <MdFastfood className="test-xl text-gray-700" />
          <input
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none text-textColor"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name..."
          ></input>
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => {
                return (
                  <option
                    key={item.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    value={item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className=" w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-4xl hover:text-gray-700 cursor-pointer" />
                      <p className="text-gray-500  hover:text-gray-700 cursor-pointer">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      className=" w-0 h-0"
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                    ></input>
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={imageAsset}
                      alt="uploaded image"
                    />
                    <button
                      onClick={deleteImage}
                      className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />

            <select
              onChange={(e) => setIsPopular(e.target.value)}
              className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
            >
              <option value="other" className="bg-white">
                Choose If Popular
              </option>
              <option value={true} className="bg-white">
                True
              </option>
              <option value={false} className="bg-white">
                False
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
