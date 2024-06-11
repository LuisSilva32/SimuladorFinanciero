import React, { useContext } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../../styles/featured.scss'
import { DarkModeContext } from '../../context/darkModeReducer'

export default function Featured () {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Ingresos totales</h1>
        <i className='bi bi-three-dots-vertical' style={{ fontSize: 'small' }} />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar styles={darkMode ? buildStyles({ pathColor: '#4C51C8', textColor: '#4cceac' }) : buildStyles({ pathColor: '#CB4335', textColor: '#E74C3C' })} value={70} text='70%' strokeWidth={5} />
        </div>
        <p className='title'>Total de ventas realizadas hoy</p>
        <p className='amount'>$1'230.000</p>
        <p className='description'>
          Procesamiento de transacciones anteriores. Es posible que el último pago no esté incluido.
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>
              Objetivo
            </div>
            <div className='itemResult negative'>
              <i className='bi bi-arrow-down-short' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>
              La semana pasada
            </div>
            <div className='itemResult positive'>
              <i className='bi bi-arrow-up-short' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>
              El mes pasado
            </div>
            <div className='itemResult positive'>
              <i className='bi bi-arrow-up-short' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
