import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import styles from './Auspiciante.module.css';

function Auspiciante({
    id,
    razon_social,
    direccion,
    localidad,
    telefono,
    logo,
    descripcion
}) {

    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    return (
        <>
            {/* Card */}
            <article
                className={styles.card}
                onClick={abrirModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        abrirModal();
                    }
                }}
            >
                <div className={styles.logoContainer}>
                    <img
                        src={`../../../${logo}`}
                        alt={`Logo ${razon_social}`}
                        className={styles.logo}
                    />
                </div>

                {descripcion && (
                    <div className={styles.contenido}>
                        <p className={styles.tema}>{descripcion}</p>
                        <p className={styles.descripcion}>{direccion}</p>
                        <p className={styles.descripcion}>{localidad}</p>
                        <p className={styles.descripcion}>{telefono}</p>
                    </div>
                )}
       
            </article>

            {/* Modal */}
            <Modal
                show={mostrarModal}
                onHide={cerrarModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {razon_social}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className={styles.modalLogoContainer}>
                        <img
                            src={logo}
                            alt={`Logo ${razon_social}`}
                            className={styles.modalLogo}
                        />
                    </div>

                    {descripcion && (
                        <p className={styles.modalDescripcion}>
                            {descripcion}
                        </p>
                    )}

                    <div className={styles.datos}>

                        {direccion && (
                            <div className={styles.dato}>
                                <strong>Dirección:</strong>
                                <span> {direccion}</span>
                            </div>
                        )}

                        {localidad && (
                            <div className={styles.dato}>
                                <strong>Localidad:</strong>
                                <span> {localidad}</span>
                            </div>
                        )}

                        {telefono && (
                            <div className={styles.dato}>
                                <strong>Teléfono:</strong>
                                <span> {telefono}</span>
                            </div>
                        )}

                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default Auspiciante;

