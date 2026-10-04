import { useState, useEffect } from "react";

import { buscarLogo, obtenerDiaSemana, obtenerNumeroDia, obtenerMes, formatearFecha} from "../../utils/funciones";

import styles from './PropuestaGastronomica.module.css';

function PropuestaGastronomica ( opcionGastronica ) {

    const [contadorMayores, setCantidadMayores] = useState(0);
    const [contadorMenores, setCantidadMenores] = useState(0);
    const [montoTotal, setMontoTotal] = useState(0);
    const [lugaresDisponible, setLugaresDisponible] = useState(0);
    const [logo, setLogo] = useState("");

    useEffect(() => {

        const disponibles =
            Number(opcionGastronica.capacidadTotal) -
            Number(opcionGastronica.capacidadOcupada);

        setLugaresDisponible(disponibles);
        setLogo(buscarLogo(opcionGastronica.tipo));

    }, [opcionGastronica]);

    useEffect(() => {

        const totalMenores = contadorMenores * parseInt(opcionGastronica.precioMenores);
        const totalMayores = contadorMayores * parseInt(opcionGastronica.precioMayores);
        setMontoTotal(totalMenores + totalMayores);

    }, [contadorMenores, contadorMayores]);


    function sumarMayores () {
        const totalSeleccion = contadorMayores + contadorMenores;
        if (totalSeleccion < lugaresDisponible) {
            setCantidadMayores(contadorMayores + 1);
        }
    }

    function restarMayores () {
        if (contadorMayores > 0) {
            setCantidadMayores(contadorMayores - 1);
        }
    }

    function sumarMenores () {
        const totalSeleccion = contadorMayores + contadorMenores;
        if (totalSeleccion < lugaresDisponible) {
            setCantidadMenores(contadorMenores + 1);
        }
    }

    function restarMenores () {
        if (contadorMenores > 0) {
            setCantidadMenores(contadorMenores - 1);
        }
    }

    return (
            <article
                className={styles.card}
            >
                <p className={styles.fecha} title={formatearFecha(opcionGastronica.fecha)}>
                    <span>
                        <strong>{obtenerDiaSemana(opcionGastronica.fecha)}</strong>
                        &nbsp;{obtenerNumeroDia(opcionGastronica.fecha)}&nbsp;de&nbsp;{obtenerMes(opcionGastronica.fecha)}
                    </span>
                
                </p>
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
                    <div className={styles.lineaSeleccion}>
                        <span className={styles.tipoPersona}>
                            Mayores
                        </span>
                        <span className={styles.precio}>
                             ${' '}{Number(opcionGastronica.precioMayores).toLocaleString('es-AR', {
                                maximumFractionDigits: 0
                            })}
                        </span>

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
                    </div>
                )}

                {opcionGastronica.precioMenores && (
                    <div className={styles.lineaSeleccion}>
                        <span className={styles.tipoPersona}>
                            Menores
                        </span>
                        <span className={styles.precio}>
                             ${' '}{Number(opcionGastronica.precioMenores).toLocaleString('es-AR', {
                                maximumFractionDigits: 0
                            })}
                        </span>

                        <div className={styles.selectorCantidad}>
                            <button
                                type="button"
                                className={styles.botonCantidad}
                                onClick={restarMenores}
                                disabled={contadorMenores === 0}
                                aria-label="Restar menor"
                            >
                                −
                            </button>

                            <span className={styles.contador}>
                                {contadorMenores}
                            </span>

                            <button
                                type="button"
                                className={styles.botonCantidad}
                                onClick={sumarMenores}
                                disabled={contadorMenores >= lugaresDisponible}
                                aria-label="Sumar menor"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                {opcionGastronica.precioMenores && (
                    <div className={styles.lineaSeleccion}>
                        <span className={styles.tipoPersona}>
                            Total
                        </span>
                        <span className={styles.montoTotal}>
                             ${' '}{Number(montoTotal).toLocaleString('es-AR', {
                                maximumFractionDigits: 0
                            })}
                        </span>

                    </div>
                )}


                <p className={styles.disponibilidad}>
                    <span>
                        <strong>{lugaresDisponible}</strong> lugares disponibles
                    </span>
                    <span className={styles.sinBebida}>
                        &nbsp;(Sin Bebida)
                    </span>
                </p>
            </article>
    );  

}
export default PropuestaGastronomica;