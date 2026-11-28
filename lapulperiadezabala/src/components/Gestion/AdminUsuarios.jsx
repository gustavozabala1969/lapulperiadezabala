import styles from './AdminUsuarios.module.css';


import { useState, useEffect} from 'react';
import { readUsuarios } from "../../services/UsuariosService";
import AdminUsuariosListado from '../../components/AdminUsuariosListado/AdminUsuariosListado';


function AdminUsuarios () {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const cargarUsuarios = async() => {
            try {
                const datos = await readUsuarios();
                setUsuarios(datos);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        cargarUsuarios();
    },[]);



    return (
        <>
        <section className={styles.seccion}>
            <h4 className={styles.titulo}>Administración de Usuarios</h4>
            
            <div>

                {cargando && (
                    <p>Cargando datos .... </p>
                )}
                {!cargando && !error==="" && (
                    <p>Error al buscar información de usuarios !! </p>
                )}
                {!cargando && error==="" && (

                    <AdminUsuariosListado
                        usuarios={usuarios}
                    />

                )}
            </div>
        </section>
        </>
    );
}

export default AdminUsuarios;