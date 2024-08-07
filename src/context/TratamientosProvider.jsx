import { createContext, useEffect, useState } from "react";
import axios from "axios";


const TratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {
    const [modal, setModal] = useState(false)
    const [tratamientos, setTratamientos] = useState([])
    const [ mensaje1 , setMensaje1 ] = useState({});

    const handleModal = () => {
        setModal(!modal)
    }

    const registrarTratamientos = async (datos) => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, datos, options)
            console.log(respuesta.data)
            setTratamientos([respuesta.data.tratamiento, ...tratamientos])
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async ( id ) => {
        try {
            const confirmar = confirm("Estas seguro de eliminar el tratamiento de un paciente??");
            if (confirmar){
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`;
                const options = {
                    headers: {
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${token}`
                    }
                }
                
                const response = await axios.delete( url , options );
                const tratamientosActualizados = tratamientos.filter( tratamiento => tratamiento._id !== id);
                setTratamientos(tratamientosActualizados);
                setMensaje1({ respuesta : response.data?.msg , tipo: true});
                setTimeout(() => {
                    setMensaje1({})
                }, 10000);
                // return {
                //     respuesta : response.data?.msg , tipo: true
                // }
                
            }

        } catch (error) {
            setMensaje1({ respuesta : error.response?.data?.msg , tipo: false});
            // return {
            //     respuesta : error.response?.data?.msg , tipo: false
            // }
            setTimeout(() => {
                setMensaje1({})
            }, 10000);
        }
    }

    const handleStatus = async ( id ) => {
        const token = localStorage.getItem('token');
        try {
            const confirmar = confirm("Estas seguro de realizar esta acción??");
            if (confirmar){
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`;
                const options = {
                    headers: {
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${token}`
                    }
                }
                const response = await axios.patch(url, {} , options);
                const tratamientosActualizados = tratamientos.filter( tratamiento => tratamiento._id !== id);
                setTratamientos(tratamientosActualizados);
                setMensaje1({ respuesta : response.data?.msg , tipo: true});
                setTimeout(() => {
                    setMensaje1({})
                }, 2000);
            }
        } catch (error) {
            setMensaje1({ respuesta : error.response?.data?.msg , tipo: false});
        }
    }



    return (
        <TratamientosContext.Provider value={
            {
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamientos,
                handleDelete,
                mensaje1,
                setMensaje1,
                handleStatus
            }
        }>
            {children}
        </TratamientosContext.Provider>
    )

}

export {
    TratamientosProvider
}

export default TratamientosContext 