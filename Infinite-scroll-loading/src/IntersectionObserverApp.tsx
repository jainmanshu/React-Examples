import React, { useEffect, useState, useRef, useCallback } from "react";

type Data = {
  id: number;
  title: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const incomingData = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
      setData((prev) => [...prev, ...incomingData]);
    } catch (e) {
      console.error("Error", e);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetching when page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [observerCallback]);

  return (
    <>
      <div>
        {data.map((d) => (
          <h2 key={d.id}>{d.title}</h2>
        ))}
      </div>
      <div ref={observerRef} style={{ height: "50px", textAlign: "center" }}>
        {loading && <h4>Loading...</h4>}
      </div>
    </>
  );
}

export default App;