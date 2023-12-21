import React, { useState, useEffect } from "react";
import SearchSide from "./components/searchSide"; // Dosya yolu güncellendi
import DataList from "./components/dataList"; // Dosya yolu güncellendi
import Footer from "./components/footer"; // Dosya yolu güncellendi

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

    switch (selectedValue) {
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
            item.titleb.toLowerCase().includes(searchValue.toLowerCase())
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
      <div className="flex flex-wrap gap-y-6 gap-x-5 items-center justify-center my-[2%]">
        {filteredData.map((item, index) => (
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
