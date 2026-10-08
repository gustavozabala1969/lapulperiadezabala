import { useEffect, useState } from 'react';

import styles from './ListaPropuestas.module.css';
import PropuestaGastronomica from "../PropuestaGastronomica/PropuestaGastronomica";

function ListaPropuestas () {

    const [propuestas, setPropuestas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarPropuestas = async() => {
            try {

                const response = await fetch('/data/propuestasGastronomicas.json');
                if (!response.ok) {
                    throw new Error('Error al cargar propuestas gastronómicas');
                }
                const listaPropuestas = await response.json();
                setPropuestas(listaPropuestas);

            } catch (error) {
                setError(error.message);
                console.log(error.message);

            } finally {
                setCargando(false);
            }
        }
        
        cargarPropuestas();
    },[]);
    
    
    return (
        <section className={styles.seccion}>
            <h4 className={styles.titulo}>Restaurante al Mediodía <small>12 a 16 hs.</small></h4>
            
            <div className={styles.lista}>

                {cargando && (
                    <p>Cargando datos .... </p>
                )}
                {!cargando && !error==="" && (
                    <p>Error al buscar información de propuestas gastronómicas !! </p>
                )}
                {!cargando && error==="" && propuestas.map((propuesta) => (
                    <PropuestaGastronomica 
                        key={propuesta.id}
                        {...propuesta} /> 
                ))}
            </div>
        </section>
    );
}

export default ListaPropuestas;