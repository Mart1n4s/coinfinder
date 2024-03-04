import React, { useState, useEffect } from 'react';
import CoinList from "./CoinList";
import axios from "axios";
import './App.css';

function App () {

  const [coins,setCoins] = useState([]);
  const [search,setSearch] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  useEffect(() => {
    fetchData();
  }, [selectedCurrency]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}`);
      setCoins(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectCurrency = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const searchedCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="mainClass">
        <h1 className="headerClass"> Crypto Currency Finder </h1>

        <div className="inputContainer">
          <input className="searchBar" type="text" placeholder="Search crypto" value={search}
                 onChange={handleSearchChange}/>

          <select className="currencySelector" value={selectedCurrency} onChange={handleSelectCurrency}>
            {currencies.map((currency) => (
                <option key={currency} value={currency}> {currency}</option>
            ))}
          </select>
        </div>

        <div className="coinClass">
          <table className="coinTable">
            <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Price Change</th>
            </tr>
            </thead>
            <tbody>
            {searchedCoins.map((coin, index) => (
                <CoinList
                    key={index}
                    image={coin.image}
                    name={coin.name}
                    symbol={coin.symbol}
                    marketCap={coin.market_cap}
                    price={coin.current_price}
                    currency={selectedCurrency}
                    priceChange={coin.price_change_percentage_24h}
                />
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default App;