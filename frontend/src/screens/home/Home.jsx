import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Datatable from '../../components/datatable/Datatable'
import dataOrders from '../../data/dataOrders'
import '../../styles/home.scss'

const dataOrdersColums = [
  {
    name: 'Producto',
    selector: row => <img className='image-product' src={row.imagen} alt={row.producto} />
  },
  {
    name: 'Proveedor',
    selector: row => row.proveedor,
    sortable: true
  },
  {
    name: 'Fecha',
    selector: row => row.fecha
  },
  {
    name: 'Cantidad',
    selector: row => row.cantidad_vendida
  },
  {
    name: 'Precio',
    selector: row => <span>{`$ ${row.precio}`}</span>
  },
  {
    name: 'Estado',
    selector: row => <span className={`status ${row.estado}`}>{row.estado}</span>
  }
]

export default function Home () {
  return (
    <div className='home'>
      <Container fluid className='homeContainer'>
        <Row className='widgets-container'>
          <Col xs={6} md={6} lg={3}>
            <Widget type='user' />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Widget type='order' />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Widget type='earning' />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Widget type='balance' />
          </Col>
        </Row>
        <Row className='charts-container'>
          <Col className='' xs={12} md={12} lg={4}>
            <Featured />
          </Col>
          <Col className='col-chart' xs={12} md={12} lg={8}>
            <Chart title='Últimos 6 meses (Ingresos)' aspect={2 / 1} />
          </Col>
        </Row>
        <Row className='list-container-home'>
          <Datatable
            title='Últimas órdenes realizadas'
            data={dataOrders.orders}
            columnsConfig={dataOrdersColums}
            noDataMessage='Aún no hay órdenes para mostrar'
            searchAttribute='proveedor'
            searchPlaceholder='Buscar por proveedores...'
          />
        </Row>
      </Container>
    </div>
  )
}
