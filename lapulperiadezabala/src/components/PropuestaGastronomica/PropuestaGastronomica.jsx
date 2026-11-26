import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";

import { buscarLogo, obtenerDiaSemana, obtenerNumeroDia, obtenerMes, formatearFecha } from "../../utils/funciones";

import styles from './PropuestaGastronomica.module.css';

function PropuestaGastronomica( {id, fecha, capacidadTotal, capacidadOcupada, tipo, descripcion,
    precioMayores, precioMenores}) {

    // const thisOpcionGastronomica = { ...opcionGastronomica}; 
    const thisOpcionGastronomica = { id, fecha, capacidadTotal, capacidadOcupada, tipo, descripcion,
    precioMayores, precioMenores };

    const [contadorMayores, setCantidadMayores] = useState(0);
    const [contadorMenores, setCantidadMenores] = useState(0);
    const [cantidadTotal,  setCantidadTotal] = useState(0);
    const [montoTotal, setMontoTotal] = useState(0);
    const [lugaresDisponible, setLugaresDisponible] = useState(0);
    const [logo, setLogo] = useState("");
    const [urlImagen, setUrlImagen] = useState(null);

 
    const { addToCart, getCantMayores, getCantMenores } = useCart();

    const contadorMayorActual = getCantMayores(thisOpcionGastronomica.id);
    const contadorMenorActual = getCantMenores(thisOpcionGastronomica.id);

    useEffect(() => {

        const disponibles =
            Number(thisOpcionGastronomica.capacidadTotal) -
            Number(thisOpcionGastronomica.capacidadOcupada);

        setLugaresDisponible(disponibles);
        setLogo(buscarLogo(thisOpcionGastronomica.tipo));

    }, [thisOpcionGastronomica]);

    useEffect(() => {

        const wCantidadTotal = contadorMenores + contadorMayores;
        setCantidadTotal(wCantidadTotal);

        const totalMenores = contadorMenores * parseInt(thisOpcionGastronomica.precioMenores);
        const totalMayores = contadorMayores * parseInt(thisOpcionGastronomica.precioMayores);
        const montoTotal = totalMenores + totalMayores;
        setMontoTotal(montoTotal);

    }, [contadorMenores, contadorMayores]);


    const sumarMayores = () => {

        const wCantidadTotal = contadorMenores + contadorMayores;
        if (wCantidadTotal < lugaresDisponible) {
            setCantidadMayores(contadorMayores + 1);
            setCantidadTotal(wCantidadTotal);
        }
    }

    const restarMayores = () => {
        if (contadorMayores > 0) {
            setCantidadMayores(contadorMayores - 1);
            const wCantidadTotal = contadorMenores + contadorMayores;
            setCantidadTotal(wCantidadTotal);
        }
    }

    const sumarMenores = () => {
        const wCantidadTotal = contadorMenores + contadorMayores;
        if (wCantidadTotal < lugaresDisponible) {
            setCantidadMenores(contadorMenores + 1);
            setCantidadTotal(wCantidadTotal);
        }
    }

    const restarMenores = () =>  {
        if (contadorMenores > 0) {
            setCantidadMenores(contadorMenores - 1);
            const wCantidadTotal = contadorMenores + contadorMayores;
            setCantidadTotal(wCantidadTotal);
        }
    }

    const handleAddToCart = () => {
        addToCart(thisOpcionGastronomica, contadorMayores, contadorMenores);
        alert(`Agregaste mayores: ${contadorMayores} y menores: ${contadorMenores} de ${thisOpcionGastronomica.fecha} (id: ${thisOpcionGastronomica.id})al carrito.`);
    };

    return (
        <article
            className={styles.card}
        >
            <p className={styles.fecha} title={formatearFecha(thisOpcionGastronomica.fecha)}>
                <span>
                    <strong>{obtenerDiaSemana(thisOpcionGastronomica.fecha)}</strong>
                    &nbsp;{obtenerNumeroDia(thisOpcionGastronomica.fecha)}&nbsp;de&nbsp;{obtenerMes(thisOpcionGastronomica.fecha)}
                </span>

            </p>
            <div className={styles.logoContainer}>
                <img
                    src={logo || null}
                    alt={`Logo ${thisOpcionGastronomica.tipo}`}
                    className={styles.logo}
                />
            </div>

            {thisOpcionGastronomica.descripcion && (
                <div className={styles.contenido}>
                    <p className={styles.descripcion}>
                        {thisOpcionGastronomica.descripcion}
                    </p>
                </div>
            )}

            {thisOpcionGastronomica.precioMayores && (
                <div className={styles.lineaSeleccion}>
                    <span className={styles.tipoPersona}>
                        Mayores
                    </span>
                    <span className={styles.precio}>
                        ${' '}{Number(thisOpcionGastronomica.precioMayores).toLocaleString('es-AR', {
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
                            disabled={cantidadTotal >= lugaresDisponible}
                            aria-label="Sumar mayor"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}

            {thisOpcionGastronomica.precioMenores && (
                <div className={styles.lineaSeleccion}>
                    <span className={styles.tipoPersona}>
                        Menores
                    </span>
                    <span className={styles.precio}>
                        ${' '}{Number(thisOpcionGastronomica.precioMenores).toLocaleString('es-AR', {
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
                            disabled={cantidadTotal >= lugaresDisponible}
                            aria-label="Sumar menor"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}

            {thisOpcionGastronomica.precioMenores && (
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
                    &nbsp;(<Link to={`/prouestaGastronica/${thisOpcionGastronomica.id}`}>+ Info</Link>)
                </span>
            </p>

            <div className={styles.lineaSeleccion}>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={cantidadTotal === 0}
                >
                    Agregar {cantidadTotal} al Carrito
                </button>

            </div>
        </article>
    );

}
export default PropuestaGastronomica;