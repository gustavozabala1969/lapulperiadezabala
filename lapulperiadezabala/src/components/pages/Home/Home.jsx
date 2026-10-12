import { buscarLogo } from "../../../utils/funciones";


import styles from './Home.module.css';

function Home() {

    return ( 

        <>
     <main className={styles.pulperia_home}>  

  
    <section className={styles.pulperia_portada}>
        <div className={styles.pulperia_portada_contenido}>
            <span className={styles.pulperia_subtitulo}>Proximamente Reapertura</span>
            <h3>El Boliche de Zabala</h3>
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
