import { useEffect, useState } from 'react';

import styles from './ListaPropuestas.module.css';
import PropuestaGastronomica from "./PropuestaGastronomica";

function ListaPropuestas () {

    const [propuestas, setPropuestas] = useState([]);

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
                console.log(error);
            }
        }
        cargarPropuestas();
    },[]);
    
    
    return (
        <section className={styles.seccion}>
            <h4 className={styles.titulo}>Opciones Gastronómicas</h4>
            
            <div className={styles.lista}>
                {propuestas.map((propuesta) => (
                    <PropuestaGastronomica 
                        key={propuesta.id}
                        {...propuesta} /> 
                ))}
            </div>
        </section>
    );
}

export default ListaPropuestas;