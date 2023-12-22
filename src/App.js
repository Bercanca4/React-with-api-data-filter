import React, { useState, useEffect } from "react";
import SearchSide from "./components/searchSide";
import DataList from "./components/dataList";
import Footer from "./components/footer";
import { BiSolidMessageSquareError } from "react-icons/bi";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    // Barın tam dolu bir şekilde başlaması için yüzde değerini 0'dan 100'e animasyonlu bir şekilde artırıyoruz.
    const startInterval = setInterval(() => {
      if (loadingPercentage < 100) {
        setLoadingPercentage((prevPercentage) =>
          Math.min(prevPercentage + 5, 100)
        );
      } else {
        clearInterval(startInterval);
      }
    }, 100);

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Api isteği başarısız !");
        }

        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => clearInterval(startInterval);
  }, []);

  const handleFilterChange = ({ searchValue, selectedValue }) => {
    let updatedData = [...data];

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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-3xl mb-4 text-black-600">
          Veriler çekiliyor ve yükleniyor...
        </p>
        <div className="w-64 h-[25px]  flex items-center justify-start  bg-gray-200 rounded-full relative">
          <div
            id="loading-bar"
            className="h-[25px] bg-blue-500 rounded-full"
            style={{ width: `${loadingPercentage}%` }}>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
              {loadingPercentage}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="text-2xl">Hata: {error}</div>;
  }

  return (
    <div>
      <div>
        <SearchSide onFilterChange={handleFilterChange} />
      </div>
      <hr />
      <div className="flex flex-wrap gap-6 items-center justify-center mt-[2%]">
        {filteredData.length === 0 && (
          <div className="flex gap-x-5 items-center border mx-auto justify-center rounded-xl shadow-2xl cursor-pointer w-[850px] h-[450px]">
            <div>
              <BiSolidMessageSquareError className="w-[50px] h-[50px]" />
            </div>
            <div>
              <p className="w-[600px] font-bold text-[22px]">
                Aradığınız ürün bulunamadı. Lütfen ürününüzün seçtiğiniz
                kategoriye uygunluğunu kontrol edin.
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
