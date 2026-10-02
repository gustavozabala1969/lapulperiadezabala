import { useState, useEffect } from "react";

import { buscarLogo, obtenerDiaSemana, formatearFecha} from "../../utils/funciones";

import styles from './PropuestaGastronomica.module.css';

function PropuestaGastronomica ( opcionGastronica ) {

    const [contadorMayores, setCantidadMayores] = useState(0);
    const [lugaresDisponible, setLugaresDisponible] = useState(0);
    const [logo, setLogo] = useState("");

    useEffect(() => {

        const disponibles =
            Number(opcionGastronica.capacidadTotal) -
            Number(opcionGastronica.capacidadOcupada);

        setLugaresDisponible(disponibles);
        setLogo(buscarLogo(opcionGastronica.tipo));
        setCantidadMayores(0);

    }, [opcionGastronica]);


    function sumarMayores () {
        if (cantidadMayores < lugaresDisponible) {
            setCantidadMayores(cantidadMayores + 1);
        }
    }

    function restarMayores () {
        if (cantidadMayores > 0) {
            setCantidadMayores(cantidadMayores - 1);
        }
    }



    return (
            <article
                className={styles.card}
                role="button"
                tabIndex={0}
            >
                <p className={styles.dia}><strong>{obtenerDiaSemana(opcionGastronica.fecha)}</strong>&nbsp;{formatearFecha(opcionGastronica.fecha)}</p>
                <div className={styles.logoContainer}>
                    <img
                        src={logo || null} 
                        alt={`Logo ${opcionGastronica.tipo}`}
                        className={styles.logo}
                    />
                </div>

                {opcionGastronica.descripcion && (
                    <div className={styles.contenido}>
                        <p className={styles.descripcion}>
                            {opcionGastronica.descripcion}
                        </p>
                    </div>
                )}

                {opcionGastronica.precioMayores && (
                    <div className={styles.contenido}>
                        <p className={styles.precio}>
                            ${' '}{Number(opcionGastronica.precioMayores).toLocaleString('es-AR', {
                                maximumFractionDigits: 0
                            })}
                        </p>
                    </div>
                )}

                {/* Selector de cantidad de mayores */}
                <div className={styles.selectorCantidad}>

                    <button
                        type="button"
                        className={styles.botonCantidad}
                        onClick={restarMayores}
                        disabled={contadorMayores === 0}
                        aria-label="Restar mayor"
                    >
                        −
                    </button>

                    <span className={styles.contador}>
                        {contadorMayores}
                    </span>

                    <button
                        type="button"
                        className={styles.botonCantidad}
                        onClick={sumarMayores}
                        disabled={contadorMayores >= lugaresDisponible}
                        aria-label="Sumar mayor"
                    >
                        +
                    </button>

                </div>

                <p className={styles.disponibilidad}>
                    {lugaresDisponible} lugares disponibles
                </p>
            </article>
    );

}
export default PropuestaGastronomica;