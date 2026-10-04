import { Row, Col } from "react-bootstrap";
// import logoLaPulperia from "../../../public/imagenes/LaPulperia.png";

import ListaAuspiciantes from "../AuspiciantesLista/ListaAuspiciantes";

import styles from "./Footer.module.css";

function Footer() {

    const logoLaPulperia = "/imagenes/LaPulperia.png";

    return (
        <footer className={styles.footer}>

            {/* Auspiciantes */}
            <section className={styles.auspiciantes}>
                <ListaAuspiciantes />
            </section>

            {/* Información principal */}
            <section className={styles.informacion}>
                <Row className="align-items-center">

                    {/* Logo */}
                    <Col xs={12} md={3} className={styles.logoCol}>
                        <img
                            src={logoLaPulperia || null}
                            className={styles.logo}
                            alt="La Pulpería de Zabala"
                        />
                    </Col>

                    {/* Dirección y horarios */}
                    <Col xs={12} md={6} className={styles.datos}>
                        <h3>
                            <strong>La Pulpería de Zabala</strong>
                        </h3>


                        <p>
                            <strong>Restaurante:</strong>{" "}
                            Sábados y Domingos de 12 a 16 hs.
                        </p>

                        <p>
                            <strong>Salón de Eventos:</strong>{" "}
                            Viernes, Sábados y Domingos de 20 a 4 hs.
                        </p>
                    </Col>

                    {/* Contacto */}
                    <Col xs={12} md={3} className={styles.contacto}>
                        <p className={styles.direccion}>
                            Ruta 68 Km 29
                        </p>
                        <p className={styles.localidad}>
                            Localidad, Buenos Aires
                        </p>

                        <p className={styles.telefono}>
                            (0221) 400-0000
                        </p>

                        <p className={styles.instagram}>
                            <span className={styles.instagram}>
                                @lapulperiadezabala
                            </span>
                        </p>
                    </Col>

                </Row>
            </section>

            {/* Copyright */}
            <section className={styles.copyright}>
                <small>
                    © La Pulpería de Zabala. Todos los derechos reservados.
                </small>
            </section>

        </footer>
    );
}

export default Footer;