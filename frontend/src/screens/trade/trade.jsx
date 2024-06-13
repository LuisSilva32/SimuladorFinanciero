import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import Datatable from '../../components/datatable/Datatable'
import '../../styles/resumeManagementScreen.scss'

const API_KEY = 'API_KEY655sfnxaIkHzLd089eedJY1QkzL7yao9a0qn13jWo00Nro'

const stockSymbols = [
    'AAPL', 'TSLA', 'AMZN', 'MSFT', 'GOOGL', 'CIB', 'EC', 'NVDA', 'AMD', 'NFLX'
]

const names = [
  'Microsoft Corp', 'Apple Inc', 'Google LLC', 'Amazon.com, Inc', 'Tesla Inc',
  'Facebook, Inc', 'Netflix Inc', 'NVidia Corp', 'Alibaba Group', 'Advanced Micro Devices Inc'
]

export default function StockDataManagementScreen () {
  const [stockData, setStockData] = useState([])

  useEffect(() => {
    fetchStockData()
  }, [])

  const fetchStockData = async () => {
    // const fetchedData = []

    try {
    //   for (let i = 0; i < stockSymbols.length; i++) {
    //     const symbol = stockSymbols[i]
    //     const name = TESLA
        const response = await axios.get(`https://api.finage.co.uk/history/stock/open-close?stock=NVDA&date=2024-05-24&apikey=API_KEY655sfnxaIkHzLd089eedJY1QkzL7yao9a0qn13jWo00Nro`)
        //   params: {
        //     stock: GOOGL,
        //     date: '2024-05-24',
        //     apikey: API_KEY
        //   }
        

        // const stockInfo = {
        //   ...response.data,
        //   name
        // }

        // fetchedData.push(stockInfo)
      
      setStockData(response.data)
    } catch (error) {
      console.error('Error fetching stock data:', error)
    }
  }

  const handleTrade = (stock) => {
    console.log('Trade button clicked for stock:', stock)
    // Aquí puedes manejar la lógica de la funcionalidad de trading
  }

  const stockDataColumns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Symbol',
      selector: row => row.symbol,
      sortable: true
    },
    {
      name: 'Open',
      selector: row => row.open,
      sortable: true
    },
    {
      name: 'High',
      selector: row => row.high,
      sortable: true
    },
    {
      name: 'Low',
      selector: row => row.low,
      sortable: true
    },
    {
      name: 'Close',
      selector: row => row.close,
      sortable: true
    },
    {
      name: 'Volume',
      selector: row => row.volume,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.from,
      sortable: true
    },
    {
      name: 'Trade',
      selector: row => (
        <button className='tradeButton' onClick={() => handleTrade(row)}>Trade</button>
      )
    }
  ]

  return (
    <Container className='container'>
      <div className='list-container-resume-management-screen'>
        <Datatable title='Stock Data Management' data={stockData} columnsConfig={stockDataColumns} />
      </div>
    </Container>
  )
}
