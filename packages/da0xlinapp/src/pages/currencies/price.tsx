import { useState, useEffect } from "react"
// import CoinDetails from "../../components/CoinDetails"
// import CoinHeader from "../../components/CoinHeader"

const Price = () => {
  const [coinName, setCoinName] = useState('')
  const [coinSymbol, setCoinSymbol] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setCoinName(urlParams.get('coin'));
    setPrice(Number(urlParams.get(price)).toLocaleString());
    setCoinSymbol(urlParams.get('symbol'));
  }

  return <div>
    {/* <CoinHeader />
    <CoinDetails coinName={coinName} price={price} coinSymbol={coinSymbol} /> */}
  </div>
}

export default Price