import React from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaYoutube, FaInstagram, FaFacebook, FaGlobe } from 'react-icons/fa';
import Layout from '../components/layout/layout';

const Ayuda = () => {
  return (
    <Layout titulo="Ayuda">
      <div className="contact-page">
        <div className="social-section">
          <h2 className="titulo-ayuda">Contacto</h2>
          <div className="contact-item">
            <a className="contact-item"> 
              <FaPhone />
              <span>2227-623372</span>
            </a>
          </div>
          <div className="contact-item">
            <a href="http://api.whatsapp.com/send?phone=5492227623372" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
          </div>
          <div className="contact-item">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=farmerin.navarro@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
              <span>E-mail</span>
            </a>
          </div>
        </div>
        <div className="social-section">
          <h2 className="titulo-ayuda">Redes</h2>
          <div className="contact-item">
            <a href="https://www.youtube.com/@farmerin8076/videos" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
              <span>YouTube</span>
            </a>
          </div>
          <div className="contact-item">
            <a href="https://www.instagram.com/farmerinar/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
          <div className="contact-item">
            <a href="https://www.facebook.com/farmerinarg" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
              <span>Facebook</span>
            </a>
          </div>
          <div className="contact-item">
            <a href="https://www.farmerin.com.ar/" target="_blank" rel="noopener noreferrer">
              <FaGlobe />
              <span>Nuestro Sitio Web</span>
            </a>
          </div>
        </div>
      </div>
      <div className="contact-page">
        <div className="map-section">
          <h2 className="titulo-ayuda-ubi">Ubicación</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d693.04266389245!2d-59.27377595010148!3d-35.00503665959691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1718821634668!5m2!1ses-419!2sar" width="100%" height="450" loading="lazy"></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Ayuda;
