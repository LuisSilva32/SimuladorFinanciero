import React, { useContext } from 'react'
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import '../../styles/chart.scss'
import { DarkModeContext } from '../../context/darkModeReducer'
import axios from 'axios'
import Storage from '../../context/Storage.jsx'
import { API_URL } from '../../api/config.js'
import Loader from '../loader/Loader.jsx'

const fetchMonthlySalesTotals = async () => {
  const response = await axios.get(`${API_URL}/api/orders/sales`)
  return response.data
}

export default function Chart ({ aspect, title }) {
  const { darkMode } = useContext(DarkModeContext)
  const { data, loading, error } = Storage('monthlySales', fetchMonthlySalesTotals)

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Loader /></div>
  if (error) return <div>Error fetching data</div>

  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(number)
  }

  return (
    <div className={`chart ${darkMode ? 'dark' : 'light'}`}>
      <div className='title'>{title}</div>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='Total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={darkMode ? '#4C51C8' : '#943126'} stopOpacity={0.8} />
              <stop offset='95%' stopColor={darkMode ? '#4C51C8' : '#E74C3C'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke={darkMode ? '#4cceac' : 'gray'} />
          <CartesianGrid strokeDasharray='3 3' className='chartGrid' />
          <Tooltip
            contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}
            formatter={(value) => [formatNumber(value), 'Total']}
          />
          <Area type='monotone' dataKey='total' stroke={darkMode ? '#4cceac' : '#943126'} fillOpacity={1} fill='url(#Total)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
