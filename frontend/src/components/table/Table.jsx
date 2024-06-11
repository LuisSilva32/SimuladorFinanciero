import React, { useState } from 'react'
import '../../styles/table.scss'
import { Table } from 'react-bootstrap'
import dataOrders from '../../data/dataOrders'

export default function TableList () {
  const [records, setRecords] = useState(dataOrders.orders)

  function handleFilter (event) {
    const newData = dataOrders.orders.filter(row => {
      return row.proveedor.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  return (
    <>
      <div className='form'>
        <input className='input' placeholder='Buscar por proveedor...' onChange={handleFilter} type='text' />
        <span className='input-border' />
      </div>
      <Table responsive='sm' className='table'>
        <thead>
          <tr>
            <th className='table-title'>Producto</th>
            <th className='table-title'>Nombre</th>
            <th className='table-title'>Proveedor</th>
            <th className='table-title'>Fecha</th>
            <th className='table-title'>Cantidad</th>
            <th className='table-title'>Precio</th>
            <th className='table-title'>Estado</th>
          </tr>
        </thead>
        <tbody>
          {records.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={order.imagen} alt={order.nombre} className='image-product' />
              </td>
              <td className='table-content'>{order.nombre}</td>
              <td className='table-content'>{order.proveedor}</td>
              <td className='table-content'>{order.fecha}</td>
              <td className='table-content'>{order.cantidad_vendida}</td>
              <td className='table-content'>$ {order.precio} cop</td>
              <td className='table-content'>
                <span className={`status ${order.estado}`}>{order.estado}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
