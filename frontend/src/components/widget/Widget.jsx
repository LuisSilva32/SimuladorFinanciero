import React, { useContext } from 'react'
import { DarkModeContext } from '../../context/darkModeReducer'
import '../../styles/widget.scss'

export default function Widget ({ type }) {
  const { darkMode } = useContext(DarkModeContext)
  let data

  // Datos temporales de prueba
  const amount = 100
  const porcent = 20

  switch (type) {
    case 'user':
      data = {
        title: 'Usuarios',
        isMoney: false,
        link: 'Ver usuarios',
        icon: <i
          className='bi-widget bi-person' style={{
            color: (darkMode ? '#E74C3C' : '#CB4335'),
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
              />
      }
      break
    case 'order':
      data = {
        title: 'Pedidos',
        isMoney: false,
        link: 'Ver pedidos',
        icon: <i
          className='bi-widget bi-cart2'style={{
            color: (darkMode ? 'yellow' : 'goldenrod'),
            backgroundColor: 'rgba(218, 165, 32, 0.2)',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
              />
      }
      break
    case 'earning':
      data = {
        title: 'Ganancias',
        isMoney: true,
        link: 'Ver ganancias',
        icon: <i
          className='bi-widget bi-currency-dollar'style={{
            color: (darkMode ? '#4cceac' : 'green'),
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
              />
      }
      break
    case 'balance':
      data = {
        title: 'Reportes',
        isMoney: true,
        link: 'Ver reportes',
        icon: <i
          className='bi-widget bi-wallet2'style={{
            color: (darkMode ? '#4C51C8' : 'purple'),
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
              />
      }
      break
    default:
      break
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>{data.isMoney && '$'} {amount}</span>
        <span className='link'>{data.link}</span>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <i className='bi bi-caret-up' />
          {porcent}%
        </div>
        {data.icon}
      </div>
    </div>
  )
}
