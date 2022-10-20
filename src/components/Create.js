import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'


const Create = () => {
  const [ genere, setGenere ] = useState( '' )
  const [ name, setName ] = useState( '' )
  const [ number, setNumber] = useState(0)
  const navigate = useNavigate()

  const filmsCollection = collection(db, "films")

  const cine = async (e) => {
    e.preventDefault()
    await addDoc( filmsCollection, { name: name, genere: genere, number: number})
    navigate('/')
    //console.log(e)
  }
  return (
    <>
      <div className='contaniner bg-dark w-100 p-5 vh-100  '>
        <div className='contaniner bg-light w-75 p-4 mt-5 rounded'>
        <div className='row'>
          <div className='col'>
            <h1>Añadir Película</h1>
            <form onSubmit={cine}>
                <div className='mb-4'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={name}
                        onChange={ (e)=> setName(e.target.value)}
                        type="text"
                        className='form-control'
                    ></input>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Género</label>
                    <input
                        value={genere}
                        onChange={ (e)=> setGenere(e.target.value)}
                        type="text"
                        className='form-control'
                    ></input>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Calificación</label>
                    <input
                        value={number}
                        onChange={ (e)=> setNumber(e.target.value)}
                        type="number"
                        className='form-control'          
                    ></input>
                  </div>
                <button type='submit' className='btn btn-secondary'>Añadir</button>
            </form>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/>
    </div>
    </>
  )
}

export default Create
