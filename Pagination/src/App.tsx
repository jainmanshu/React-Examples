import "./App.css";
import { useEffect, useMemo, useState } from "react";

interface Data {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function App() {
  const [pageSize, setPageSize] = useState<any>(20);

  const [data, setData] = useState<Data[]>([]);

  const [selectedPage, setSelectedPage] = useState<any>(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const pages = useMemo(() => {
    if (data.length) {
      const len = data.length;
      const noOfPages: any = Math.ceil(len / pageSize);
      return [...Array(noOfPages + 1).keys()].slice(1);
    }
  }, [pageSize, data]);

  const filterData = useMemo(() => {
    const indexLastElement = pageSize * selectedPage;
    const indexFirstElement = indexLastElement - pageSize;
    return data.slice(indexFirstElement, indexLastElement);
  }, [pageSize, selectedPage, data]);

  const handleChange = (event: any) => {
    setPageSize(event.target.value);
    setSelectedPage(1);
  };

  return (
    <>
      <div>
        <div>
          <label> Page Size </label>
          <select value={pageSize} onChange={handleChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          {pages &&
            pages.map((p: number) => {
              return (
                <span
                  onClick={() => setSelectedPage(p)}
                  key={p}
                  className={selectedPage === p ? "active" : ""}
                >
                  {p} |{" "}
                </span>
              );
            })}
        </div>
        <div>
          {filterData.length &&
            filterData.map((d: Data) => {
              return (
                <li style={{ margin: 5 }} key={d.id}>
                  {d.name}
                </li>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
