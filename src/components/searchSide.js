import React from "react";

function searchSide() {
  return (
    <div className="relative  border-orange-400 rounded-b-xl shadow-2xl border-2 h-[150px] flex items-center justify-center">
      <div>
        <div>
          <label className="text-[30px]  font-semibold select-none">
            Veri filtrele
          </label>
        </div>
        <div className="my-1 flex items-center gap-x-2 justify-center">
          <input
            type="text"
            className=" outline-none hover:border-orange-500  border-2 pl-2 rounded-xl h-[50px] w-[500px]"
            placeholder="Veri arayın..."
          />
          <select className="rounded-xl outline-none border p-1 h-[50px]">
            <option>Filtrele</option>
            <option>Türe göre</option>
            <option>Harfe göre</option>
            <option>Fiyata göre artan </option>
            <option>Fiyata göre azalan </option>
            <option>Puana göre en iyi</option>
            <option>Puana göre en kötü</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default searchSide;
