import React, { useState, useEffect } from 'react'
import '../../styles/products.scss'
import Datatable from '../../components/datatable/Datatable'
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../api/config.js'

export default function ProductScreen () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`) // Asegúrate de que esta URL sea correcta
      console.log(response.data)

      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleShowProducts = async (product) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Editar información de Producto',
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Regresar',
        reverseButtons: true,
        html: `
          <div class="swal-container">
            <input id="swal-input-category" class="swal2-input" placeholder="Category" value="${product.category}">
            <input id="swal-input-cost" class="swal2-input" placeholder="Cost" value="${product.cost}">
            <input id="swal-input-description" class="swal2-input" placeholder="Description" value="${product.description}">
            <input id="swal-input-name" class="swal2-input" placeholder="Name" value="${product.name}">
            <input id="swal-input-price" class="swal2-input" placeholder="Price" value="${product.price}">
            <input id="swal-input-stock" class="swal2-input" placeholder="Stock" value="${product.stock}">
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return {
            category: document.getElementById('swal-input-category').value,
            cost: document.getElementById('swal-input-cost').value,
            description: document.getElementById('swal-input-description').value,
            name: document.getElementById('swal-input-name').value,
            price: document.getElementById('swal-input-price').value,
            stock: document.getElementById('swal-input-stock').value
          }
        }
      })

      if (formValues) {
        console.log('Updated Product Information:', formValues)
        // Aquí puedes manejar la actualización del usuario, por ejemplo, enviando los datos al servidor
        axios.put(`${API_URL}/api/products/update/${product._id}`, formValues)
          .then(() => {
            Swal.fire({
              title: '¡Actualizado!',
              text: 'La información del producto ha sido actualizada.',
              icon: 'success'
            })
            fetchProducts()
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error'
            })
          })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      })
    }
  }

  const deleteHandler = (product) => {
    Swal.fire({
      title: '¿Eliminar producto del Inventario?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminarlo!',
      cancelButtonText: 'No, ¡cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/api/products/delete/${product._id}`)
          .then(() => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El Producto ha sido eliminado.',
              icon: 'success'
            })
            fetchProducts()
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error'
            })
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El producto está a salvo :)',
          icon: 'error'
        })
      }
    })
  }

  const dataProductColumns = [
    {
      name: 'Imagen',
      selector: row => <img className='avatar' src={row.img} />
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Precio',
      selector: row => `$ ${row.price}`
    },
    {
      name: 'Stock',
      selector: row => row.stock
    },
    {
      name: 'Estado',
      selector: row => <span className={`status ${row.state}`}>{row.state}</span>
    },
    {
      name: 'Opciones',
      selector: row => (
        <div className='cellAction'>
          <button className='viewButton' onClick={() => handleShowProducts(row)}>Ver</button>
          <button className='deleteButton' onClick={() => deleteHandler(row)}>Eliminar</button>
        </div>
      )
    }
  ]

  return (
    <div className='container'>
      <div className='list-container-product-screen'>
        <Datatable
          title='Gestionar inventario de productos'
          data={products}
          columnsConfig={dataProductColumns}
          searchAttribute='name'
          searchPlaceholder='Buscar productos...'
          selectableRows
        />
      </div>
    </div>
  )
}
