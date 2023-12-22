import React from "react";

function dataList({ title, description, price, category, image, rating }) {
  return (
    <div className=" flex rounded-xl items-center justify-center hover:scale-105 hover:duration-500 hover:transition duration-500 transition group hover:shadow-xl ">
      <div className=" rounded-xl h-[450px] w-[300px]  shadow-lg border-2 group-hover:border-2 group-hover:border-orange-500 ">
        <div className=" my-2 items-center w-[280px] mx-auto flex justify-center select-none">
          <img src={image} className=" w-[150px] h-[150px]  rounded-t-xl" />
        </div>

        <div className="mt-4  mx-auto flex items-center w-[280px] select-none">
          <label className="text-[18px] font-sans  whitespace-nowrap  truncate ">
            {title}
          </label>
        </div>

        <div className="mb-3 mt-2 mx-auto flex items-center w-[280px]  justify-center select-none">
          <label className="text-[14px] whitespace-normal line-clamp-3  font-serif ">
            {description}
          </label>
        </div>

        <div className="my-4 mx-auto flex items-center justify-center w-[280px] select-none">
          <label className="text-[14px] flex items-center justify-center bg-orange-500  w-[80px] h-[40px] text-white rounded-xl border p-1  font-semibold  whitespace-nowrap  truncate ">
            {price} ₺
          </label>
        </div>

        <div className="my-2 mx-auto flex items-center  h-[40px]  justify-center w-[280px] rounded-xl border-orange-500 border p-1 select-none">
          <label className="text-[15px] select-none font-semibold whitespace-normal line-clamp-1  ">
            Tür/Kategori : {category}
          </label>
        </div>

        <div className="my-2 mx-auto w-[280px] h-[40px] flex items-center justify-between p-1 rounded-xl border border-orange-500 select-none">
          <label className="text-[15px] text-black mx-auto">
            Puan : <b>{rating.rate}</b>
          </label>
          <label className="text-[15px] text-black mx-auto">
            Yorumlar({rating.count})
          </label>
        </div>
      </div>
    </div>
  );
}

export default dataList;
