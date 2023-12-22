import React, { useState } from "react";

function SearchSide({ onFilterChange }) {
  const [searchValue, setSearchValue] = useState(""); // Arama değeri için state
  const [selectedValue, setSelectedValue] = useState("0"); // Seçilen değer için state

  // Input'ta değişiklik olduğunda tetiklenen fonksiyon
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); // State'i güncelle
    onFilterChange({ searchValue: value, selectedValue }); // App.js'teki fonksiyona gönder
  };

  // Select'te değişiklik olduğunda tetiklenen fonksiyon
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value); // State'i güncelle
    onFilterChange({ searchValue, selectedValue: value }); // App.js'deki fonksiyona gönder
  };

  return (
    <div className="relative shadow-xl border-2 h-[150px] flex items-center   justify-center">
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
            onChange={handleInputChange}
            className="outline-none hover:border-orange-500 border-2 pl-2 rounded-xl h-[50px] w-[500px]"
            placeholder="Veri arayın..."
          />
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="rounded-xl outline-none border p-1 h-[50px]">
            <option value="0">Tümünü Filtrele</option>
            <option value="1">Kelimeye göre</option>
            <option value="2">Türe göre</option>
            <option value="3">Fiyata göre artan</option>
            <option value="4">Fiyata göre azalan</option>
            <option value="5">Puana göre en iyi</option>
            <option value="6">Puana göre en kötü</option>
            <option value="7">En çok yorum alan</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchSide;
