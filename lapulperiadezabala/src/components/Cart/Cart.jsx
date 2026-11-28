
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import styles from './Cart.module.css';

const Cart = () => {

    const { cart, clearCart, getCartTotal, removeItem } = useCart();

    const formatoPrecio = (precio) =>
        Number(precio || 0).toLocaleString('es-AR', {
            maximumFractionDigits: 0
        });

    if (cart.length === 0) {
        return (
            <section className={styles.carritoVacio}>
                <div className={styles.iconoVacio}>🛒</div>
                <h2>Tu carrito está vacío</h2>
                <p>
                    Todavía no agregaste ningún evento gastronómico.
                </p>
                <Link to="/reservas" className={styles.botonVolver}>
                    Ver eventos gastronómicos
                </Link>
            </section>
        );
    }

    return (
        <section className={styles.contenedor}>

            <h1 className={styles.titulo}>Carrito de Compras</h1>

            <div className={styles.contenido}>

                {/* LISTADO DE EVENTOS */}
                <div className={styles.listaProductos}>

                    {cart.map(item => {

                        const subtotalMayores =
                            Number(item.precioMayores || 0) * item.cantMayores;

                        const subtotalMenores =
                            Number(item.precioMenores || 0) * item.cantMenores;

                        const subtotal = subtotalMayores + subtotalMenores;

                        return (
                            <article key={item.id} className={styles.producto}>

                                <div className={styles.productoInfo}>

                                    <div className={styles.productoEncabezado}>
                                        <h3>{item.descripcion || 'Evento gastronómico'}</h3>
                                        <span className={styles.fecha}>
                                            {item.fecha}
                                        </span>
                                    </div>

                                    <div className={styles.detalle}>
                                        {item.cantMayores > 0 && (
                                            <p>
                                                <span>
                                                    {item.cantMayores} {item.cantMayores === 1 ? 'Adulto' : 'Adultos'} ×
                                                    ${formatoPrecio(item.precioMayores)}
                                                </span>
                                                <strong>
                                                    ${formatoPrecio(subtotalMayores)}
                                                </strong>
                                            </p>
                                        )}

                                        {item.cantMenores > 0 && (
                                            <p>
                                                <span>
                                                    {item.cantMenores} {item.cantMenores === 1 ? 'Menor' : 'Menores'} ×
                                                    ${formatoPrecio(item.precioMenores)}
                                                </span>
                                                <strong>
                                                    ${formatoPrecio(subtotalMenores)}
                                                </strong>
                                            </p>
                                        )}
                                    </div>

                                </div>

                                <div className={styles.productoPie}>
                                    <div className={styles.subtotal}>
                                        <span>Subtotal</span>
                                        <strong>${formatoPrecio(subtotal)}</strong>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.botonEliminar}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>

                            </article>
                        );
                    })}

                    <button
                        type="button"
                        className={styles.botonVaciar}
                        onClick={clearCart}
                    >
                        Vaciar carrito
                    </button>

                </div>

                {/* PANEL RESUMEN */}
                <aside className={styles.resumen}>

                    <h2>Resumen de compra</h2>

                    <div className={styles.resumenDetalle}>
                        <span>Eventos seleccionados</span>
                        <strong>{cart.length}</strong>
                    </div>

                    <div className={styles.resumenDetalle}>
                        <span>Cantidad de personas</span>
                        <strong>
                            {cart.reduce(
                                (total, item) =>
                                    total + item.cantMayores + item.cantMenores,
                                0
                            )}
                        </strong>
                    </div>

                    <div className={styles.separador}></div>

                    <div className={styles.total}>
                        <span>Total a pagar</span>
                        <strong>${formatoPrecio(getCartTotal())}</strong>
                    </div>

                    <Link to="/pago" className={styles.botonPagar}>
                        Continuar con el pago
                    </Link>

                    <Link to="/reservas" className={styles.seguirComprando}>
                        Seguir agregando eventos
                    </Link>

                </aside>

            </div>

        </section>
    );
};

export default Cart;
