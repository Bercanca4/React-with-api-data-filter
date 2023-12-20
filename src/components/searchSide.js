import React, { useState } from "react";

function SearchSide({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="relative border-orange-400 rounded-b-xl shadow-2xl border-2 h-[150px] flex items-center justify-center">
      <div>
        <div>
          <label className="text-[30px] font-semibold select-none">
            Veri filtrele
          </label>
        </div>
        <div className="my-1 flex items-center gap-x-2 justify-center">
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            className="outline-none hover:border-orange-500 border-2 pl-2 rounded-xl h-[50px] w-[500px]"
            placeholder="Veri arayın..."
          />
          <select className="rounded-xl outline-none border p-1 h-[50px]">
            <option id="0">Filtrele</option>
            <option id="1">Türe göre</option>
            <option id="2">Harfe göre</option>
            <option id="3">Fiyata göre artan</option>
            <option id="4">Fiyata göre azalan</option>
            <option id="5">Puana göre en iyi</option>
            <option id="6">Puana göre en kötü</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchSide;
