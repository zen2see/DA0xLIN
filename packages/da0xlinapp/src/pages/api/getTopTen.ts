export default function handler(req: any, res: any) {
  
  const getData = async () => {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=c0b57c4b-5765-415d-8efe-32dd814d9492`,
      {
        method: 'GET',
        headers: {
          Accept: '*/*'
        },
      },
    
    )
    const data = await response.json()
    res.status(200).json({ data })
  }
  getData()
}
// c0b57c4b-5765-415d-8efe-32dd814d9492