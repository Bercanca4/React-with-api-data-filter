import React, { useState, useEffect } from "react";
import SearchSide from "./components/searchSide";
import DataList from "./components/dataList";
import Footer from "./components/footer";

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

  if (isLoading) {
    return <div className="text-2xl">Veri yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-2xl">Hata : {error}</div>;
  }

  return (
    <div>
      <div>
        <SearchSide />
      </div>
      <div className="flex flex-wrap gap-y-4 gap-x-8 items-center justify-center my-[2%]">
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
