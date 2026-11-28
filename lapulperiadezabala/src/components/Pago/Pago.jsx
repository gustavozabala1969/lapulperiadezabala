
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

import styles from './Pago.module.css';

const Pago = () => {

    const navigate = useNavigate();

    const { cart, getCartTotal, clearCart } = useCart();

    const [datosComprador, setDatosComprador] = useState({
        apellidoNombre: '',
        email: '',
        whatsapp: ''
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setDatosComprador(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const seleccionarPago = (medio) => {
        alert(`La opción de pago "${medio}" se encuentra en desarrollo.`);
    };

    const formatoPrecio = (precio) =>
        Number(precio || 0).toLocaleString('es-AR', {
            maximumFractionDigits: 0
        });

    const manejarSubmit = (e) => {
        e.preventDefault();

        alert('El proceso de confirmación de compra se encuentra en desarrollo.\n\nEl carrito quedará vacío.');

        clearCart();
        navigate('/reservas');
    };

    if (cart.length === 0) {
        return (
            <section className={styles.carritoVacio}>
                <h2>No hay eventos para pagar</h2>
                <p>Primero agregá un evento gastronómico al carrito.</p>

                <Link to="/reservas" className={styles.botonVolver}>
                    Ver eventos
                </Link>
            </section>
        );
    }

    return (
        <section className={styles.contenedor}>

            <h1 className={styles.titulo}>Finalizar reserva</h1>

            <p className={styles.subtitulo}>
                Completá tus datos para continuar con la reserva gastronómica.
            </p>

            <div className={styles.contenido}>

                {/* DATOS DEL COMPRADOR */}
                <form
                    className={styles.formulario}
                    onSubmit={manejarSubmit}
                >

                    <h2>Datos del comprador</h2>

                    <div className={styles.campo}>
                        <label htmlFor="apellidoNombre">
                            Apellido y Nombre
                        </label>

                        <input
                            type="text"
                            id="apellidoNombre"
                            name="apellidoNombre"
                            value={datosComprador.apellidoNombre}
                            onChange={manejarCambio}
                            placeholder="Ingresá tu apellido y nombre"
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="email">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={datosComprador.email}
                            onChange={manejarCambio}
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="whatsapp">
                            WhatsApp
                        </label>

                        <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            value={datosComprador.whatsapp}
                            onChange={manejarCambio}
                            placeholder="Ej: 11 2345 6789"
                            required
                        />
                    </div>

                    <div className={styles.opcionesPago}>

                        <h2>Medio de pago</h2>

                        <p>Seleccioná cómo preferís realizar el pago:</p>

                        <button
                            type="button"
                            className={styles.opcionPago}
                            onClick={() => seleccionarPago('Transferencia bancaria')}
                        >
                            <span className={styles.iconoPago}>🏦</span>
                            <span>
                                <strong>Transferencia bancaria</strong>
                                <small>Pago mediante transferencia</small>
                            </span>
                            <span className={styles.flecha}>›</span>
                        </button>

                        <button
                            type="button"
                            className={styles.opcionPago}
                            onClick={() => seleccionarPago('Mercado Pago')}
                        >
                            <span className={styles.iconoPago}>💳</span>
                            <span>
                                <strong>Mercado Pago</strong>
                                <small>Pago electrónico</small>
                            </span>
                            <span className={styles.flecha}>›</span>
                        </button>

                        <button
                            type="button"
                            className={styles.opcionPago}
                            onClick={() => seleccionarPago('Efectivo en el restaurante')}
                        >
                            <span className={styles.iconoPago}>💵</span>
                            <span>
                                <strong>Efectivo en el restaurante</strong>
                                <small>Pago presencial en La Pulpería</small>
                            </span>
                            <span className={styles.flecha}>›</span>
                        </button>

                    </div>

                    <button
                        type="submit"
                        className={styles.botonConfirmar}
                    >
                        Confirmar reserva
                    </button>

                    <Link to="/carrito" className={styles.volverCarrito}>
                        Volver al carrito
                    </Link>

                </form>

                {/* RESUMEN DE COMPRA */}
                <aside className={styles.resumen}>

                    <h2>Resumen de tu reserva</h2>

                    {cart.map(item => {

                        const subtotalMayores =
                            Number(item.precioMayores || 0) * item.cantMayores;

                        const subtotalMenores =
                            Number(item.precioMenores || 0) * item.cantMenores;

                        return (
                            <div key={item.id} className={styles.evento}>

                                <h3>{item.descripcion || 'Evento gastronómico'}</h3>

                                <p className={styles.fecha}>
                                    {item.fecha}
                                </p>

                                {item.cantMayores > 0 && (
                                    <p>
                                        {item.cantMayores} {item.cantMayores === 1 ? 'Adulto' : 'Adultos'}:
                                        <strong>
                                            ${formatoPrecio(subtotalMayores)}
                                        </strong>
                                    </p>
                                )}

                                {item.cantMenores > 0 && (
                                    <p>
                                        {item.cantMenores} {item.cantMenores === 1 ? 'Menor' : 'Menores'}:
                                        <strong>
                                            ${formatoPrecio(subtotalMenores)}
                                        </strong>
                                    </p>
                                )}

                                <div className={styles.linea}></div>

                            </div>
                        );
                    })}

                    <div className={styles.total}>
                        <span>Total a pagar</span>
                        <strong>${formatoPrecio(getCartTotal())}</strong>
                    </div>

                </aside>

            </div>

        </section>
    );
};

export default Pago;
