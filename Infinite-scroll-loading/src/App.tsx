import { useEffect, useState } from "react";
import "./App.css";

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState<any>(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?page=${page}`
      );
      const incomingData = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData((prev: Data[]) => [...prev, ...incomingData]);
    } catch (e) {
      console.error("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;

    if (scrollTop + clientHeight + 10 >= scrollHeight && !loading) {
      setLoading(true);
      setPage((oldPage: any) => oldPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        {data.length > 0 &&
          data.map((d, index) => <h2 key={index}>{d.title}</h2>)}
      </div>
      <div>{loading && <h1>Loading.....</h1>}</div>
    </>
  );
}

export default App;
