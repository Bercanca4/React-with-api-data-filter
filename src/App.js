import React, { useState, useEffect } from "react";
import SearchSide from "./components/searchSide";
import DataList from "./components/dataList";
import Footer from "./components/footer";

function App() {
  const [data, setData] = useState(null);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchValue) => {
    const filtered = data.filter((item) => {
      // Arama değerini küçük harfe dönüştürüyoruz.
      const searchTerm = searchValue.toLowerCase();

      // Ürün özelliklerini (title, description, category vb.) dolaşıyoruz.
      for (let key in item) {
        // Eğer özellik bir string ise ve arama kelimesini içeriyorsa true döndürüyoruz.
        if (
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(searchTerm)
        ) {
          return true;
        }
      }
      // Eğer hiçbir özellik arama kelimesini içermiyorsa false döndürüyoruz.
      return false;
    });

    setFilteredData(filtered);
  };

  if (isLoading) {
    return (
      <div>
        <label className="text-[72px]">veri yükleniyor...</label>
      </div>
    );
  }

  if (error) {
    return <div>Hata : {error}</div>;
  }

  return (
    <div className="top-0 left-0 right-0 bottom-0">
      <div className=" w-[1200px] mx-auto">
        <SearchSide onSearch={handleSearch} />
      </div>

      <div className="flex flex-wrap items-center my-[5%] justify-center w-full  gap-4">
        {filteredData.length > 0 ? (
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
          ))
        ) : (
          <div className="flex flex-wrap items-center my-[5%] justify-center w-full  gap-4">
            {data.map((item, index) => (
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
