import React from "react";
import { useState, useEffect } from "react";
import Logo from "./Images/logo_files/logo.png";
import Avatar from "./Images/General/avatar.png";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { MdShoppingCart, MdLogout, MdAdd } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const location = useLocation();
  const navigate = useNavigate();
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));

      elem.scrollIntoView({ behavior: "smooth", block: "center" });
      console.log(elem);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  const login = async () => {
    if (!user) {
      const { user } = await signInWithPopup(firebaseAuth, provider);
      const { refreshToken, providerData } = user;
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className=" fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16  bg-primary onClick={()=>}  ">
      {/* desktop & tablets */}
      <div className=" hidden md:flex w-full h-full items-center justify-between  p-4">
        <Link to="/" className="flex items-center gap-2">
          <motion.img
            // whileTap={{ scale: 0.6 }}
            src={Logo}
            className=" object-cover rounded-full w-16 h-16"
            alt="logo"
          />
          <motion.p
            // whileTap={{ scale: 0.6 }}
            className=" text-xl font-bold p-2"
          >
            {" "}
            Cafe Masaryktown
          </motion.p>
        </Link>
        <div className=" flex items-center gap-8">
          <motion.ul
            // initial={{ opacity: 0, x: 200 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <Link
              to="/"
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              <motion.div whileTap={{ scale: 0.6 }}>Home</motion.div>
            </Link>
            <Link
              to="/#menu"
              // onClick={() => {
              //   const menu = document.querySelector("#menu");
              //   menu.scrollIntoView({ behavior: "smooth", block: "center" });
              // }}
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              <motion.div whileTap={{ scale: 0.6 }}>Menu</motion.div>
            </Link>
            <Link
              to="/contact"
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              <motion.div whileTap={{ scale: 0.6 }}>Contact Us</motion.div>
            </Link>
          </motion.ul>
          <div
            className="relative flex items-center justify-center "
            onClick={showCart}
          >
            <MdShoppingCart className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-5 -right-2 w-6 h-6 rounded-full bg-cartBg flex items-center justify-center ">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative ">
            <motion.img
              onClick={login}
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-14 h-14 rounded-full  shadow-xl cursor-pointer"
              alt="avatar"
            />
            {isMenu ? (
              <motion.div
                // initial={{ opacity: 0, scale: 0.6 }}
                // animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-grey-50  shadow-xl rounded-lg absolute flex flex-col  top-16 right-0 bg-white"
              >
                {user && user.email === "roger61087@gmail.com" && (
                  <Link to="createItem">
                    <p
                      onClick={() => setIsMenu(false)}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className=" flex md:hidden w-full h-full justify-between">
        <div
          className="relative flex items-center justify-center  "
          onClick={showCart}
        >
          <MdShoppingCart className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-0 -right-3 w-6 h-6 rounded-full bg-cartBg flex items-center justify-center ">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2">
          <motion.img
            // whileTap={{ scale: 0.6 }}
            src={Logo}
            className=" object-cover rounded-full w-16 h-16"
            alt="logo"
          />
          <p className=" text-xl font-bold p-2"> Cafe Masaryktown</p>
        </Link>

        <div className=" flex items-center gap-8">
          <div className="relative">
            <motion.img
              onClick={login}
              // whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-14 h-14 rounded-full  shadow-xl cursor-pointer"
              alt="avatar"
            />
            {/* {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-white  shadow-xl rounded-lg absolute flex flex-col  top-16 right-0 "
              >
                {user && user.email === "roger61087@gmail.com" && (
                  <Link to="createItem">
                    <p
                      onClick={() => setIsMenu(false)}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <ul className="flex flex-col    ">
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 text-base text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer "
                  >
                    Home
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 text-base text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer"
                  >
                    Menu
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 text-base text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer"
                  >
                    About Us
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2  text-base text-textColor hover:text-headingColor  hover:bg-slate-200  duration-100 transition-all ease-in-out cursor-pointer"
                  >
                    Services
                  </li>
                </ul>

                <p
                  onClick={logout}
                  className=" m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
};
