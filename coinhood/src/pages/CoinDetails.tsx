import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/Chart";

function CoinDetails() {
  const [chartData, setChartData] = useState<any>([]);
  const [coinData, setCoinData] = useState<any>([]);

  const { id } = useParams();

  const fetchChartData = useCallback(async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=120`
    );
    const data = await response.json();
    const graphData = data.prices.map((price: any) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-US");
      return {
        Date: date,
        Price: p,
      };
    });
    setChartData(graphData);
  }, [id]);

  const fetchCoinData = useCallback(async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?market_data=true`
    );
    const data = await response.json();
    setCoinData(data);
  }, [id]);

  useEffect(() => {
    Promise.all([fetchChartData(), fetchCoinData()]);
  }, []);

  if (!id || !chartData || !coinData) return <></>;

  return (
    <div>
      <h2>{coinData.name}</h2>
      <Chart data={chartData} />
    </div>
  );
}

export default CoinDetails;
