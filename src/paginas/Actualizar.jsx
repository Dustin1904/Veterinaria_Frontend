import React from 'react'
import { useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Formulario } from '../componets/Formulario'

const Actualizar = () => {
    const {id} =useParams()
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
      const consultarPaciente = async() => {
        try {
            const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                console.log(respuesta);
                setPaciente(respuesta.data.paciente)
                
        } catch (error) {
            console.log(error);
            
        }
      }

      consultarPaciente()
    }, [])
    
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar...</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite Actualizar un paciente .....</p>
            {
            Object.keys(paciente).length != 0 ? (
                <Formulario paciente={paciente}/>
            )
            :
            (
                <p>No existe ese paciente {paciente.nombre}</p>
            )
            }
        </div>

        
    )
}

export default Actualizar