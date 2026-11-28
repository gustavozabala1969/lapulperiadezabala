
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import styles from './Header.module.css';

function Header() {

    const logoLaPulperia = "/imagenes/LaPulperia.png";
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    const [menuGestionAbierto, setMenuGestionAbierto] = useState(false);

    const cerrarMenuGestion = () => {
        setMenuGestionAbierto(false);
    };

    return (
        <header className={styles.header}>

            <div className={styles.identidad}>

                <img
                    src={logoLaPulperia}
                    className={styles.logo}
                    alt="La Pulpería de Zabala"
                />

                <div className={styles.titulo}>
                    <span>Restaurante Típico de Campo</span>
                </div>

            </div>

            <nav className={styles.nav}>

                <Link to="/home" className={styles.link}>
                    Inicio
                </Link>

                <Link to="/reservas" className={styles.link}>
                    Eventos
                </Link>

                <Link to="/historia" className={styles.link}>
                    Historia
                </Link>

                <details
                    className={styles.menu_gestion}
                    open={menuGestionAbierto}
                    onToggle={(e) => setMenuGestionAbierto(e.currentTarget.open)}
                >
                    <summary className={styles.link}>
                        Gestión
                        <span className={styles.flecha}>▾</span>
                    </summary>

                    <div className={styles.submenu}>

                        <Link to="/adminEventos" onClick={cerrarMenuGestion}>
                            Eventos
                        </Link>

                        <Link to="/adminAuspiciantes" onClick={cerrarMenuGestion}>
                            Auspiciantes
                        </Link>

                        <Link to="/adminUsuarios" onClick={cerrarMenuGestion}>
                            Usuarios
                        </Link>

                    </div>
                </details>

                <Link to="/auspiciantes" className={styles.link}>
                    Auspiciantes
                </Link>

                <Link
                    to="/carrito"
                    className={`${styles.link} ${styles.carrito}`}
                >
                    <span className={styles.iconoCarrito}>🛒</span>
                    <span>Carrito</span>

                    {totalItems > 0 && (
                        <span className={styles.cantidadCarrito}>
                            {totalItems}
                        </span>
                    )}
                </Link>

            </nav>

        </header>
    );
}

export default Header;
