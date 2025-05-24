import React, { useState, useRef, useCallback, useEffect } from 'react';

const InfiniteScrollList = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMore = useCallback(() => {
    const newItems = Array.from({ length: 20 }, (_, i) => `Item ${items.length + i + 1}`);
    setItems((prev) => [...prev, ...newItems]);
    setPage((p) => p + 1);
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore]);

  return (
    <div style={{ height: '80vh', overflow: 'auto' }}>
      {items.map((item, index) => (
        <div key={index} style={{ padding: 20, border: '1px solid #ccc' }}>
          {item}
        </div>
      ))}
      <div ref={loader} style={{ height: 100, backgroundColor: '#eee', textAlign: 'center' }}>
        Loading...
      </div>
    </div>
  );
};

export default InfiniteScrollList;