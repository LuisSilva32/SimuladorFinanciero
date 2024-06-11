import React, { useContext } from 'react'
import '../../styles/navbar.scss'
import { DarkModeContext } from '../../context/darkModeReducer'
import { Navbar } from 'react-bootstrap'

export default function NavBar ({ handleShow }) {
  const { dispatch } = useContext(DarkModeContext)

  return (
    <Navbar className='navbar'>
      <div className='wrapper'>
        <button variant='primary' onClick={handleShow} className='menu-button-sidebar'>
          <i className='bi bi-list' />
        </button>
        <div className='search'>
          <input type='text' placeholder='Buscar...' />
          <i className='bi bi-search' />
        </div>
        <div className='items'>
          <div className='item'>
            <i className='bi bi-moon-stars' onClick={() => dispatch({ type: 'TOGGLE' })} />
          </div>
          <div className='item'>
            <i className='bi bi-arrows-angle-expand' />
          </div>
          <div className='item'>
            <i className='bi bi-bell' />
          </div>
          <div className='item'>
            <i className='bi bi-chat' />
          </div>
          <div className='item-user'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
              alt='User'
              className='avatar'
            />
          </div>
        </div>
      </div>
    </Navbar>
  )
}
