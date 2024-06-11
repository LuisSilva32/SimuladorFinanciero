import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../../styles/slider.scss'

export default function Slider () {
  return (
    <Carousel variant='dark' className='slider-container'>
      <Carousel.Item>
        <img
          className='slider-img'
          src='../../../public/slider-Imgs/poblacion-total.webp'
          alt='Imagen 1'
        />
        <Carousel.Caption className='info'>
          <h2>Poblacion total</h2>
          <span>Marzo 2024:</span>
          <p className='text-muted'>52.215.503</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='slider-item'>
        <img
          className='slider-img'
          src='../../../public/slider-Imgs/pib.webp'
          alt='Imagen 2'
        />
        <Carousel.Caption className='info'>
          <h2>PIB</h2>
          <span>Variación Trim, IV 2023:</span>
          <p className='text-muted'>0.3%</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='slider-item'>
        <img
          className='slider-img'
          src='../../../public/slider-Imgs/ipc.webp'
          alt='Imagen 3'
        />
        <Carousel.Caption className='info'>
          <h2>IPC</h2>
          <span>Marzo 2024:</span>
          <p className='text-muted'>0,70%</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='slider-item'>
        <img
          className='slider-img'
          src='../../../public/slider-Imgs/ipp.webp'
          alt='Imagen 4'
        />
        <Carousel.Caption className='info'>
          <h2>IPP</h2>
          <span>Variación mensual Marzo 2024:</span>
          <p className='text-muted'>0,12%</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='slider-item'>
        <img
          className='slider-img'
          src='../../../public/slider-Imgs/tasa-de-desocupacion.webp'
          alt='Imagen 5'
        />
        <Carousel.Caption className='info'>
          <h2>Tasa de desocupacion</h2>
          <span>Total nacional Febrero 2024:</span>
          <p className='text-muted'>11,7%</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='slider-item'>
        <img
          className='slider-img'
          src='../../../public/slider-Imgs/promedio-libros-leidos.webp'
          alt='Imagen 5'
        />
        <Carousel.Caption className='info'>
          <h2>Promedio de libros leidos</h2>
          <span>Por persona Cab. municipales 2020: 3,9</span>
          <p className='text-muted'>3,9</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
