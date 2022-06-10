import React from "react";
import hero from "./Images/General/heroBg.png";
import { items } from "../utils/staticData";

const HomeContainer = () => {
  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full  "
    >
      <div className="py-2 flex flex-1 flex-col items-start justify-center   gap-6">
        <p className="text-[2rem] font-bold tracking-wide text-headingColor md:text-[4rem]">
          Best Cubans North Of{" "}
          <span className="text-orange-600 text-[2.5rem] md:text-[5rem]">
            Havana Cuba
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left lg:w-[80%] ">
          located One Mile North Of County Line Road In The Beautiful City Of
          Masaryktown In Hernando County, While Driving On US 41 Also Know As
          Broad Street. You Will See A Blinking Yellow Light As You Come Through
          This Intersection You Will See The Restaurant On The East side of US
          Hwy 41.
        </p>
        <button className="md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full p-4 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img
          className="ml-auto  h-420 w-full lg:w-auto lg:h-650"
          src={hero}
          alt="hero-bg"
        />
        {/* m-5 w-full h-full lg:ml-[10rem] lg:mr-[5rem]   absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap */}

        <div
          className=" w-full h-full absolute top-0 left-0 flex items-center justify-center mt-4  py-4 gap-4 flex-wrap xxl:px-32 xxl:ml-32"
        >
          {items &&
            items.map((item) => (
              <div
                key={item.id}
                className="  lg:m-[5px] lg:w-[200px] lg:h-300 w-[150px] h-150  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={item.src}
                  className="w-20 h-20  lg:w-40 lg:h-175 -mt-10 lg:-mt-20 "
                  alt="I1"
                />
                <p className="text-center text-base lg:text-xl font-bold  mt-2 lg:mt-4">
                  {item.name}
                </p>

                <p className="text-sm font-semibold text-headingColor mt-3">
                  <span className="text-xs text-red-600">$</span> {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
