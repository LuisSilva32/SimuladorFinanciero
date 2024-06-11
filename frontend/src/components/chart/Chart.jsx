import React, { useContext } from 'react'
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import '../../styles/chart.scss'
import { DarkModeContext } from '../../context/darkModeReducer'

const data = [
  {
    name: 'Enero', total: 250000
  },
  {
    name: 'Febrero', total: 570000
  },
  {
    name: 'Marzo', total: 180000
  },
  {
    name: 'Abril', total: 430000
  },
  {
    name: 'Mayo', total: 132700
  },
  {
    name: 'Junio', total: 642100
  }
]

export default function Chart ({ aspect, title }) {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={`chart ${darkMode ? 'dark' : 'light'}`}>
      <div className='title'>{title}</div>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart
          width={730} height={250} data={data}
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
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }} />
          <Area type='monotone' dataKey='total' stroke={darkMode ? '#4cceac' : '#943126'} fillOpacity={1} fill='url(#Total)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
