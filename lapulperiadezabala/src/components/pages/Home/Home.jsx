import { useEffect, useState } from 'react';

import { readEventosNuevos } from "../../../services/PropuestasService";
import PropuestaGastronomica from "../../PropuestaGastronomica/PropuestaGastronomica";

import { buscarLogo } from "../../../utils/funciones";
import styles from './Home.module.css';

function Home() {

    const [propuestas, setPropuestas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        readEventosNuevos()
            .then((datos) => {
                setPropuestas(datos);
            })
            .catch((error) => {
                setError(error.message);
                console.error(error);
            })
            .finally(() => {
                setCargando(false);
            });

    }, []);

    const gastronomia = [
        { nombre: "Cerdo", imagen: "CERDO" },
        { nombre: "Asado", imagen: "ASADO" },
        { nombre: "Pollo", imagen: "POLLO" },
        { nombre: "Pastas", imagen: "PASTAS" }
    ];

    return (
        <main className={styles.pulperia_home}>

            {/* PORTADA / BIENVENIDA */}
            <section className={styles.pulperia_portada}>

                <div className={styles.portada_contenido}>

                    <h1>
                        Reabrimos
                        <span>El Boliche de Zabala</span>
                    </h1>

                    <p className={styles.portada_bajada}>
                        Vuelven los encuentros, los buenos momentos,
                        la comida casera, la música y las tradiciones de una pulpería.
                    </p>

                </div>

            </section>


            {/* EVENTOS */}
            <section className={styles.seccion_eventos}>

                <div className={styles.seccion_encabezado}>

                    <h3>Nuevos eventos</h3>

                    <p>
                        Descubrí nuestras próximas propuestas y reservá
                        tu lugar para compartir.
                    </p>

                </div>

                <div className={styles.lista_eventos}>

                    {cargando && (
                        <p className={styles.mensaje}>
                            Cargando eventos...
                        </p>
                    )}

                    {!cargando && error !== "" && (
                        <p className={styles.mensaje_error}>
                            No pudimos cargar los eventos.
                        </p>
                    )}

                    {!cargando && error === "" && propuestas.length === 0 && (
                        <p className={styles.mensaje}>
                            Próximamente anunciaremos nuevos eventos.
                        </p>
                    )}

                    {!cargando && error === "" && propuestas.map((propuesta) => (
                        <PropuestaGastronomica
                            key={propuesta.id}
                            {...propuesta}
                        />
                    ))}

                </div>

            </section>


            {/* PROPUESTAS GASTRONÓMICAS */}
            <section className={styles.seccion_gastronomia}>

                <div className={styles.gastronomia_contenido}>

                    <div className={styles.seccion_encabezado}>

                        <span className={styles.seccion_etiqueta}>
                            Sabores de nuestra cocina
                        </span>

                        <h3>Además...</h3>

                        <p>
                            Una propuesta gastronómica para cada ocasión.
                            Los sabores tradicionales que nos gustan,
                            preparados para disfrutar y compartir.
                        </p>

                    </div>

                    <div className={styles.pulperia_menu}>

                        {gastronomia.map((item) => (
                            <div
                                key={item.imagen}
                                className={styles.gastronomia_item}
                            >
                                <img
                                    src={buscarLogo(item.imagen)}
                                    alt={item.nombre}
                                />

                                <span>{item.nombre}</span>
                            </div>
                        ))}

                    </div>

                </div>

            </section>


            {/* FRASE FINAL */}
            <section className={styles.pulperia_frase}>

                <p>
                    "Hay lugares donde la comida es una excusa
                    para encontrarse."
                </p>

                {/* <span>El Boliche de Zabala</span> */}

            </section>

        </main>
    );
}

export default Home;
