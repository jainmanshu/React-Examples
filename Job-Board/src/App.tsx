import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

type NewsFeed = {
  by: string;
  id: number;
  time: number;
  title: string;
  url: string;
};
const Page_Size = 6;

function App() {
  const [jobsId, setJobsId] = useState<number[]>([]);
  const [data, setData] = useState<NewsFeed[]>([]);
  const [page, setPage] = useState<number>(0);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const fetchDetails = async (id: number) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return await response.json();
  };

  const fetchJobId = async (currPage: number) => {
    let jobs = jobsId;
    if (!jobs.length) {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      jobs = await response.json();
      setJobsId(jobs);
    }
    const start = currPage * Page_Size;
    const end = start + Page_Size;
    return jobs.slice(start, end);
  };

  const fetchData = async (currPage: number) => {
    const jobsforPage: number[] = await fetchJobId(currPage);
    setFetchLoading(true);
    const mappedData = await Promise.all(
      jobsforPage.map((id: number) => fetchDetails(id))
    );
    setFetchLoading(false);
    setData([...data, ...mappedData]);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <>
      <h1>Hacker News Jobs Board</h1>
      {data.map((feed: NewsFeed, index) => (
        <Card key={index} data={feed} />
      ))}
      {data.length > 0 && page * Page_Size < jobsId.length && (
        <button onClick={() => setPage((oldPage) => oldPage + 1)}>
          {fetchLoading ? ".....Loading" : "Load More"}
        </button>
      )}
    </>
  );
}

export default App;
