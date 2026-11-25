import styles from './Header.module.css';
import { useCart } from '../../context/CartContext';

function Header() {

    const logoLaPulperia = "/imagenes/LaPulperia.png";
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <header className={styles.header}>

            {/* Parte izquierda */}
            <div className={styles.identidad}>

                <img
                    src={logoLaPulperia || null} 
                    className={styles.logo}
                    alt="La Pulpería de Zabala"
                />
                <div className={styles.titulo}>
                    <span>Restaurante</span>
                    <span>Típico de Campo</span>
                </div>

            </div>

            {/* Menú */}
            <nav className={styles.nav}>

                <a href="/home" className={styles.link}>
                    Inicio
                </a>

                <a href="/reservas" className={styles.link}>
                    Eventos
                </a>

                <a href="/historia" className={styles.link}>
                    Historia
                </a>

                {/* SUBMENÚ GESTIÓN */}
                <details className={styles.menu_gestion}>

                    <summary className={styles.link}>
                        Gestión
                        <span className={styles.flecha}>▾</span>
                    </summary>

                    <div className={styles.submenu}>

                        <a href="/adminEventos">
                            Eventos
                        </a>

                        <a href="/adminAuspiciantes">
                            Auspiciantes
                        </a>

                        <a href="/adminUsuarios">
                            Usuarios
                        </a>

                    </div>

                </details>


                <a href="/auspiciantes" className={styles.link}>
                    Auspiciantes
                </a>

                <a
                    href="/carrito"
                    className={`${styles.link} ${styles.carrito}`}
                >
                    <span className={styles.iconoCarrito}>🛒</span>
                    <span>Carrito</span>
                    {totalItems > 0 && <span className={styles.cantidadCarrito}>{totalItems}</span>}
                </a>

            </nav>

        </header>
    );
}

export default Header;