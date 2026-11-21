import { useEffect, useState } from 'react';

import { readEventosNuevos, readEventos } from "../../../services/PropuestasService";
import PropuestaGastronomica from "../../PropuestaGastronomica/PropuestaGastronomica";

import { buscarLogo } from "../../../utils/funciones";
import styles from './Home.module.css';

function Home() {

    const [propuestas, setPropuestas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        readEventos()
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

        <>
        <main className={styles.pulperia_home}>  
    
            <section className={styles.pulperia_portada}>
                <div className={styles.pulperia_portada_contenido}>
                    <span className={styles.pulperia_subtitulo}>Abrimos nuevamente: "El Boliche de Zabala"</span> 
                </div>

                <div className={styles.pulperia_portada_contenido}>
                    <h3>Eventos Destacados</h3>
                </div>

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

                <div >
                    <p className={styles.pulperia_subtitulo}>Además ...</p> 
                </div>
                <div className={styles.pulperia_menu}>
                        <img
                            src={buscarLogo("CERDO")} 
                            alt={`Logo CERDO`}
                            className={styles.logo}
                        />
                        <img
                            src={buscarLogo("ASADO")} 
                            alt={`Logo ASADO`}
                            className={styles.logo}
                        />
                        <img
                            src={buscarLogo("POLLO")} 
                            alt={`Logo POLLO`}
                            className={styles.logo}
                        />
                        <img
                            src={buscarLogo("PASTAS")} 
                            alt={`Logo PASTAS`}
                            className={styles.logo}
                        />
                    </div>
            </section>


            {/*
            <section className={styles.pulperia_frase}>
                <blockquote>
                "Porque hay lugares que no se miden por sus paredes,
                sino por las historias que guardan y las personas que
                pasaron por ellos."
                </blockquote>
                <span>El Boliche de Zabala</span>
            </section>
            */}

        </main> 
    </>

    );
}

export default Home;
