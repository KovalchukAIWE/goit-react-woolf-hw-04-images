import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ onClose, img, src }) => {
  useEffect(() => {
    const handlePressKey = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handlePressKey);

    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <img src={img} alt={src} />
      </div>
    </div>
  );
};

export default Modal;
