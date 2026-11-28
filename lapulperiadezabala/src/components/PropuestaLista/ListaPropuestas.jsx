import { useEffect, useState } from 'react';

import styles from './ListaPropuestas.module.css';
import PropuestaGastronomica from "../PropuestaGastronomica/PropuestaGastronomica";

import { readEventosVigentes } from "../../services/PropuestasService";

function ListaPropuestas () {

    const [propuestas, setPropuestas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        readEventosVigentes()
        .then((datos) => {
            setPropuestas(datos);
        })
        .catch ((error) => {
            setError(error.message);
            console.log(error.message);

        }) 
        .finally(() => {
            setCargando(false);
        });
    },[]);
    
    
    return (
        <section className={styles.seccion}>
            <h4 className={styles.titulo}>Abierto de <small>12 a 16 hs.</small></h4>
            
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