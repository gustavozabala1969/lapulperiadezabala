
import styles from './AdminAuspiciantes.module.css';

function AdminAuspiciantes() {
    return (
        <section className={styles.seccion}>
            <div className={styles.contenedor}>
                <div className={styles.icono}>
                    <i className="bi bi-megaphone"></i>
                </div>

                <h2>Gestión de Auspiciantes</h2>

                <div className={styles.separador}></div>

                <h3>Sección en desarrollo</h3>

                <p>
                    Estamos trabajando para ofrecerte próximamente
                    las herramientas necesarias para administrar
                    los auspiciantes de La Pulpería.
                </p>

                <span className={styles.etiqueta}>
                    Próximamente disponible
                </span>
            </div>
        </section>
    );
}

export default AdminAuspiciantes;
