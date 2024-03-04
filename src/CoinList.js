import React from 'react';
import './CoinList.css';

const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$'
};

const CoinList = ({image, name, symbol, price, currency, priceChange, marketCap}) => {
    const currencySymbol = currencySymbols[currency];

    return (
        <tr className="coinRow">
            <td className="coinImage"><img src={image} alt={name}/></td>
            <td className="coinName">{name}</td>
            <td className="coinSymbol">{symbol.toUpperCase()}</td>
            <td className="coinMarketCap">{currencySymbol}{marketCap}</td>
            <td className="coinPrice">{currencySymbol}{price}</td>
            <td className="coinPriceChange">{priceChange}%</td>
        </tr>
    );
};

export default CoinList;