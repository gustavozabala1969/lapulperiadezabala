import styles from './Header.module.css';

function Header() {

    const logoLaPulperia = "/imagenes/LaPulperia.png";

    return (
        <header className={styles.header}>

            {/* Parte izquierda */}
            <div className={styles.identidad}>

                <img
                    src={logoLaPulperia || null} 
                    className={styles.logo}
                    alt="La Pulpería de Zabala"
                />
                <span className={styles.titulo}>Restaurante Típico de Campo</span>
            </div>

            {/* Menú */}
            <nav className={styles.nav}>

                <a href="/home" className={styles.link}>
                    Pulpería
                </a>

                <a href="/reservas" className={styles.link}>
                    Reservas
                </a>

                <a href="/eventos" className={styles.link}>
                    Eventos
                </a>

                <a href="/auspiciantes" className={styles.link}>
                    Auspiciantes
                </a>

                <a
                    href="/carrito"
                    className={`${styles.link} ${styles.carrito}`}
                >
                    🛒 Carrito
                </a>

            </nav>

        </header>
    );
}

export default Header;