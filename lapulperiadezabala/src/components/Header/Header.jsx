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
                    Reservas
                </a>

                <a href="/historia" className={styles.link}>
                    Historia
                </a>

                <a href="/admin" className={styles.link}>
                    Admin
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