interface NewsFeed {
  data: any;
}

function Card({ data }: NewsFeed) {
  return (
    <div
      style={{
        margin: 10,
        height: 100,
        border: "1px solid white",
        cursor: "pointer",
      }}
      onClick={() => window.open(data.url, "mywindow")}
    >
      <h3>{data.title}</h3>
      <span>
        By {data.by} - {new Date(data.time * 1000).toLocaleString("en-US")}
      </span>
    </div>
  );
}

export default Card;
