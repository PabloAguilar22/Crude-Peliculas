import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'

const MySwal = withReactContent(Swal)

const Show = () => {

    //1- Configuración de hooks
    const [films, setFilms] = useState( [] )

    //2- Referencias de la DB firestore
    const filmsCollection = collection(db, "films")
    
    //3- Funcion para mostrar TODOS los docs
    const getFilms = async () => {
      const data = await getDocs(filmsCollection)
      //console.log(data.docs)

      setFilms(
        data.docs.map(  (doc) => ({ ...doc.data(), id:doc.id }))
      )
      //console.log(films)
    }

    //4- Funcion para eliminar un doc
    const deleteFilm = async (id) => {
      const filmDoc = doc(db, "films", id)
      await deleteDoc(filmDoc)
      getFilms()
    }


    //5- Funcion de confirmación para Sweet Alert 2

    const confirmDelete = (id) => {
      MySwal.fire({
        title:'¿Estás seguro de borrarlo?',
        text:'No se podrá deshacer la acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#951B5C',
        cancelButtonColor: '#1B7695',
        confirmButtonText: 'Si, borrar.',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed){

          deleteFilm(id)
          Swal.fire(
            'Eliminado',
            'La película ha sido eliminada.'
          )
        }
      })
    }

    //6- Usamos useEffect
    useEffect( () => {
      getFilms()
      //eslint-disable-next-line
    }, [])

    //7- Devolver vista de los componentes

  return (
    <>
      <div className='contaniner bg-dark w-800 p-3'>
        <div className='container bg-light w-100 h-100 p-3 rounded'>
        <h3>Ingresa una Película</h3>
        <br/>
          <div className='row'>
            <div className='col'>
              <div className='d-grid gap-2'>
                
                <table className='table table-hover'>
                  <thead>
                    <th>
                      Nombre
                    </th>
                    <th>
                      Género
                    </th>
                    <th>
                      Calificación
                    </th>
                  </thead>
                  <br/>
                  <tbody>
                    {films.map((film) => (
                      <tr key={film.id}>
                        <td>{film.name}</td>
                        <td>{film.genere}</td>
                        <td>{film.number}</td>
                        <td>
                          <Link to={`/edit/${film.id}`} className='btn btn-dark'><i className='fa-solid fa-pen-to-square'></i></Link>
                          <button onClick={ () => {confirmDelete(film.id)} } className="btn btn-danger"><i className='fa-solid fa-trash-can'></i></button>
                        </td>    
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/create" className='btn btn-secondary mt-3 mb-3'>Añadir</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show;