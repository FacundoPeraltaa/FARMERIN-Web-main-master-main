import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase2';
import { AiFillAlert } from 'react-icons/ai';
import { GiCow, GiInfo } from 'react-icons/gi';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <button onClick={onClose}>Cerrar</button>
                <div>{children}</div>
            </div>
        </div>
    );
};

export const ObtenerAnimalesPerfilForm = () => {
    const { firebase, tamboSel } = useContext(FirebaseContext);
    const [vacas, setVacas] = useState(0);
    const [vacasEnOrdeñe, setVacasEnOrdeñe] = useState(0);
    const [vacasSecas, setVacasSecas] = useState(0);
    const [vaquillonas, setVaquillonas] = useState(0);
    const [vaquillonasEnOrdeñe, setVaquillonasEnOrdeñe] = useState(0);
    const [vaquillonasSecas, setVaquillonasSecas] = useState(0);
    const [vaquillonasServicio, setVaquillonasServicio] = useState(0);
    const [crias, setCrias] = useState(0);
    const [mostrarLista, setMostrarLista] = useState(false);
    const [showVacasModal, setShowVacasModal] = useState(false);
    const [showVaquillonasModal, setShowVaquillonasModal] = useState(false);
    const [showCriasModal, setShowCriasModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tamboSel) return;

        try {
            // Obtener vacas en ordeñe y secas
            const vacasSnapshot = await firebase.db.collection('animal')
                .where('idtambo', '==', tamboSel.id)
                .where('mbaja', '==', '')
                .where('categoria', '==', 'Vaca')
                .get();
            const vacasData = vacasSnapshot.docs.map(doc => doc.data());
            setVacas(vacasData.length);
            setVacasEnOrdeñe(vacasData.filter(vaca => vaca.estpro === 'En Ordeñe').length);
            setVacasSecas(vacasData.filter(vaca => vaca.estpro === 'seca').length);

            // Obtener vaquillonas en ordeñe, secas y para servicio
            const vaquillonasSnapshot = await firebase.db.collection('animal')
                .where('idtambo', '==', tamboSel.id)
                .where('mbaja', '==', '')
                .where('categoria', '==', 'Vaquillona')
                .get();
            const vaquillonasData = vaquillonasSnapshot.docs.map(doc => doc.data());
            setVaquillonas(vaquillonasData.length);
            setVaquillonasEnOrdeñe(vaquillonasData.filter(vaquillona => vaquillona.estpro === 'En Ordeñe').length);
            setVaquillonasSecas(vaquillonasData.filter(vaquillona => vaquillona.estpro === 'seca').length);
            setVaquillonasServicio(vaquillonasData.filter(vaquillona => vaquillona.estpro === 'Vq.p/servicio').length);

            // Obtener crías
            const criasSnapshot = await firebase.db.collection('animal')
                .where('idtambo', '==', tamboSel.id)
                .where('mbaja', '==', '')
                .where('estpro', '==', 'cria')
                .get();
            setCrias(criasSnapshot.size);
        } catch (error) {
            console.log(error);
        }

        setMostrarLista(true);
    };

    return (
        <div className="card-fondoBotones">
            <form className="animales-form" onSubmit={handleSubmit}>
                <button className="obtener-animales-button" style={{ "--clr": "#00ad54" }} type="submit">
                    <span className="obtener-animales-button-decor"></span>
                    <div className="obtener-animales-button-content">
                        <div className="obtener-animales-button__icon">
                            <GiCow size={24} style={{ color: '#fff' }}/>
                        </div>
                        <span className="obtener-animales-button__text">Obtener Animales</span>
                    </div>
                </button>
                {mostrarLista && (
                    <div className="card-botones-animales">
                        <div className="card-botones-animales2">
                        <h1 className="tituloAnimales">
                            Total de Animales: {vacas + vaquillonas} 
                            <span className="AdverPerfil">
                                <div className="tooltip-container">
                                    <div className="icon-tooltip">
                                        <GiInfo size={20} />
                                    </div>
                                    <div className="tooltip" style={{ fontSize: '18px' }}>
                                        <p>Advertencia: El número final de animales incluye únicamente Vacas y Vaquillonas; las Crías no están contempladas</p>
                                    </div>
                                </div>
                            </span>
                        </h1>
                        <div className="animales-list-container" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <button className="custom-obtenerAnimales-button" onClick={() => setShowVacasModal(true)}>Ver Lista de Vacas</button>
                            <button className="custom-obtenerAnimales-button" onClick={() => setShowVaquillonasModal(true)}>Ver Lista de Vaquillonas</button>
                            <button className="custom-obtenerAnimales-button" onClick={() => setShowCriasModal(true)}>Ver Lista de Crías</button>
                            <button className="custom-obtenerAnimales-button" onClick={() => setMostrarLista(false)}>Cerrar</button>
                        </div>
                        </div>
                        </div>
                    )}
                </form>

            <Modal show={showVacasModal} onClose={() => setShowVacasModal(false)} title="Lista de Vacas" style={{ textAlign: 'center' }}>
                <div className="listaPerfil">
                    <h3>Vacas</h3>
                    <p>Vacas: {vacas}</p>
                    <p>Vacas en Ordeñe: {vacasEnOrdeñe}</p>
                    <p>Vacas Secas: {vacasSecas}</p>
                </div>
            </Modal>

            <Modal show={showVaquillonasModal} onClose={() => setShowVaquillonasModal(false)} title="Lista de Vaquillonas">
                <div className="listaPerfil">
                    <h3>Vaquillonas</h3>
                    <p>Vaquillonas: {vaquillonas}</p>
                    <p>Vaquillonas en Ordeñe: {vaquillonasEnOrdeñe}</p>
                    <p>Vaquillonas Secas: {vaquillonasSecas}</p>
                    <p>Vaquillonas para Servicio: {vaquillonasServicio}</p>
                </div>
            </Modal>

            <Modal show={showCriasModal} onClose={() => setShowCriasModal(false)} title="Lista de Crías">
                <div className="listaPerfil">
                    <h3>Crias</h3>
                    <p>Crias: {crias}</p>
                </div>
            </Modal>
        </div>
    );
}; 