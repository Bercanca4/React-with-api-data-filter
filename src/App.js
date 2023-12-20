import React, { useState, useEffect } from "react";
import SearchSide from "./components/searchSide";
import DataList from "./components/dataList";
import Footer from "./components/footer";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <SearchSide />
      </div>
      <div className="flex flex-wrap items-center my-[5%] justify-center w-full  gap-6">
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
      <Footer />
    </div>
  );
}

export default App;
