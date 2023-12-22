import React, { useState, useEffect } from "react";
import SearchSide from "./components/searchSide"; // Dosya yolu güncellendi
import DataList from "./components/dataList"; // Dosya yolu güncellendi
import Footer from "./components/footer"; // Dosya yolu güncellendi
import { BiSolidMessageSquareError } from "react-icons/bi";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Api isteği başarısız !");
        }

        const result = await response.json();
        setData(result);
        setFilteredData(result); // Başlangıçta tüm veriyi filtrelenmiş veriye ayarla
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = ({ searchValue, selectedValue }) => {
    let updatedData = [...data];

    // <option value="2">Türe göre</option>
    // <option value="3">Fiyata göre artan</option>
    // <option value="4">Fiyata göre azalan</option>
    // <option value="5">Puana göre en iyi</option>
    // <option value="6">Puana göre en kötü</option>
    // <option value="7">En çok yorum alan</option>

    switch (selectedValue) {
      case "0": // Filtreleme tümünü karışık yapar ve title'a göre filtreler.
        updatedData = updatedData.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      case "1": // Kelimeye göre filtreleme
        updatedData = updatedData.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      case "2": // Türe göre sıralama
        updatedData.sort((a, b) => a.category.localeCompare(b.category));
        if (searchValue) {
          updatedData = updatedData.filter((item) =>
            item.category.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        break;
      case "3": // Fiyata göre artan sıralama
        updatedData.sort((a, b) => a.price - b.price);
        if (searchValue) {
          updatedData = updatedData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        break;
      case "4": // Fiyata göre azalan sıralama
        updatedData.sort((a, b) => b.price - a.price);
        if (searchValue) {
          updatedData = updatedData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        break;
        break;
      case "5": // Puana göre en iyi sıralama
        updatedData.sort((a, b) => b.rating.rate - a.rating.rate);
        if (searchValue) {
          updatedData = updatedData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        break;
      case "6": // Puana göre en kötü sıralama
        updatedData.sort((a, b) => a.rating.rate - b.rating.rate);
        if (searchValue) {
          updatedData = updatedData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        break;
      case "7": // En çok yorum alan sıralama
        updatedData.sort((a, b) => b.rating.count - a.rating.count);
        if (searchValue) {
          updatedData = updatedData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        break;
      default: // Tümünü filtrele veya diğer durumlar için varsayılan
        break;
    }

    setFilteredData(updatedData);
  };
  if (isLoading) {
    return <div className="text-2xl">Veri yükleniyor...</div>;
  }
  if (error) {
    return <div className="text-2xl">Hata : {error}</div>;
  }

  return (
    <div>
      <div>
        <SearchSide onFilterChange={handleFilterChange} />
      </div>
      <div className="flex flex-wrap gap-y-6 gap-x-5 items-center mt-[5%] justify-center ">
        {filteredData.length === 0 && (
          <div className="flex gap-x-5 items-center justify-center rounded-xl shadow-2xl  cursor-pointer  w-[850px] h-[450px]">
            <div>
              <BiSolidMessageSquareError className="w-[50px] h-[50px]" />
            </div>
            <div>
              <p className="text-center font-bold text-[22px]">
                Veri bulunamadı.
              </p>
            </div>
          </div>
        )}

        {filteredData.length > 0 &&
          filteredData.map((item, index) => (
            <DataList
              key={index}
              title={item.title}
              description={item.description}
              price={item.price}
              category={item.category}
              image={item.image}
              rating={item.rating}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
