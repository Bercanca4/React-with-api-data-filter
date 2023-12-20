function SearchSide() {
  return (
    <div className="relative shadow-xl border-2 h-[150px] flex items-center justify-center">
      <div>
        <div>
          <label className="text-[30px] font-semibold select-none">
            Veri filtrele
          </label>
        </div>
        <div className="my-1 flex items-center gap-x-2 justify-center">
          <input
            type="text"
            className="outline-none hover:border-orange-500 border-2 pl-2 rounded-xl h-[50px] w-[500px]"
            placeholder="Veri arayın..."
          />
          <select className="rounded-xl outline-none border p-1 h-[50px]">
            <option value="0">Tümünü Filtrele</option>
            <option value="1">Kelimeye göre </option>
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
