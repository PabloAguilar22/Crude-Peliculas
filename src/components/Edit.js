import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { async } from "@firebase/util"

const Edit = () => {

  const [ genere, setGenere ] = useState( '' )
  const [ name, setName ] = useState( '' )
  const [ number, setNumber] = useState(0)
  const navigate = useNavigate()
  const {id} = useParams()


  const update = async (e) => {
    e.preventDefault()
    const film = doc(db, "films", id)
    const data = { name: name, genere: genere, number: number}
    await updateDoc(film, data)
    navigate('/')
  }

  const getFilmById = async (id) => {
    const film = await getDoc( doc(db, "films", id) )

    if(film.exists()){
      //console.log(film.data)
      
      setName(film.data().name)
      
      setGenere(film.data().genere)
      
      setNumber(film.data().number)

    }else{
      console.log('La película no existe.')
    }
  }

  useEffect( () => {
    getFilmById(id)
    //eslint-disable-next-line
  }, [])
  
  return (
    <>
      <div className='contaniner bg-dark w-100 p-5 vh-100  '>
        <div className='contaniner bg-light w-75 p-4 mt-5 rounded'>
        <div className='row'>
          <div className='col'>
            <h1>Editar Película</h1>
            <form onSubmit={update}>
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
                <button type='submit' className='btn btn-secondary'>Acturalizar</button>
            </form>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/>
    </div>
    </>
  )
}

export default Edit