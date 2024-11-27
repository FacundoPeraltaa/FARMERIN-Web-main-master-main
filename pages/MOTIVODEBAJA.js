import React, { useState, useContext } from "react";
import { FirebaseContext } from '../firebase2';
import Layout from '../components/layout/layout';

const MiComponente = () => {
  const [animalesConBaja, setAnimalesConBaja] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { firebase, tamboSel } = useContext(FirebaseContext);

  // Función para obtener animales con mbaja y fbaja no vacíos
  const obtenerAnimalesConBaja = async () => {
    setLoading(true);
    setError(null);
    try {
      // Referencia a la colección 'animal'
      const querySnapshot = await firebase.db.collection('animal')
        .where('idtambo', '==', tamboSel.id)
        .get();

      const animales = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Verifica que mbaja y fbaja no estén vacíos
        if (data.mbaja && data.fbaja) {
          animales.push({ id: doc.id, ...data });
        }
      });

      setAnimalesConBaja(animales);
    } catch (error) {
      console.error("Error obteniendo animales:", error);
      setError("Error obteniendo animales. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout titulo="Herramientas">
      <div>
        <button onClick={obtenerAnimalesConBaja} disabled={loading}>
          {loading ? "Cargando..." : "Obtener Animales con Baja"}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {animalesConBaja.length === 0 && !loading && <li>No se encontraron animales con baja.</li>}
          {animalesConBaja.map((animal) => (
            <li key={animal.id}>
              Nombre: {animal.rp}, ID: {animal.erp}, mbaja: {animal.mbaja}, fbaja: {animal.fbaja}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default MiComponente;
