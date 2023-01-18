import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import { bitcoinResponse } from "../utils/zod/schemas";

const API_URL =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2";
const fetchData = async () => {
  const data = await fetch(API_URL);
  const res = await data.json() as unknown
  const query = bitcoinResponse.parse(await data.json()).Data;
  console.log(query.Data);
  return query;
};

const useBitcoinQuery = () => {
  return useQuery({
    queryKey: ["data.all"],
    queryFn: fetchData,
  });
};

const Home: NextPage = () => {
  const query = useQuery({
    queryKey: ["data.all"],
    queryFn: fetchData,
  });

  if (query.isLoading) return <div>Loading..</div>
  if (query.isError) return <div>Error</div>
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="aboveit-bitcoin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex border-b bg-white p-4">
        <h1 className="text-4xl">Bitcoin</h1>
      </nav>

      <main className="flex min-h-screen flex-col gap-4 bg-red-100 p-4">
        {query.isLoading && <div>Loading..</div>}

        {query.data && (
          <table className="flex flex-col bg-yellow-500">
            <tr className="grid grid-cols-7 gap-2 text-left odd:bg-white even:bg-slate-200">
              <th>High</th>
              <th>Low</th>
              <th>Time</th>
              <th>Close</th>
              <th>Open</th>
              <th>Volumefrom</th>
              <th>Volumeto</th>
            </tr>
            {query.data.Data.map((day) => (
              <tr
                key={day.time}
                className="grid grid-cols-7 gap-2 odd:bg-white even:bg-slate-200"
              >
                <td>{day.high}</td>
                <td>{day.low}</td>
                <td>{new Date(day.time * 1000).toDateString()}</td>
                <td>{day.close}</td>
                <td>{day.open}</td>
                <td>{day.volumefrom}</td>
                <td>{day.volumeto}</td>
              </tr>
            ))}
          </table>
        )}
      </main>
    </>
  );
};

export default Home;
