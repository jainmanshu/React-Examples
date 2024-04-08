import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useDebounce from "../helper/useDebounce";

type Data = {
  name: string;
  image: string;
  id: string;
  priceBtc: number;
  priceUsd: number;
};

function Home() {
  const [trending, setTrending] = useState<Data[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const fetchTrending = async () => {
    const [response, btcRes] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/search/trending"),
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      ),
    ]);
    const data = await response.json();
    const btcPrice = await btcRes.json();

    setTrending(
      data.coins.map((coin: any) => {
        return {
          name: coin.item.name,
          image: coin.item.large,
          id: coin.item.id,
          priceBtc: coin.item.price_btc.toFixed(10),
          priceUSD: (coin.item.price_btc * btcPrice.bitcoin.usd).toFixed(10),
        };
      })
    );
    setData(
      data.coins.map((coin: any) => {
        return {
          name: coin.item.name,
          image: coin.item.large,
          id: coin.item.id,
          priceBtc: coin.item.price_btc.toFixed(10),
          priceUSD: (coin.item.price_btc * btcPrice.bitcoin.usd).toFixed(10),
        };
      })
    );
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${debounceSearchTerm}`
    );
    const data = await response.json();
    setData(
      data.coins.map((coin: any) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      })
    );
  };

  useEffect(() => {
    if (debounceSearchTerm.length > 2) {
      handleSearch();
    } else {
      setData(trending);
    }
  }, [debounceSearchTerm]);

  return (
    <div>
      <Header />
      <div>
        <label>Search</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {data.map((coin: Data, index: number) => (
          <li key={index}>
            <Link to={coin.id}>{coin.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
