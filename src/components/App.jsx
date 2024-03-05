import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getPhotos } from 'service/service-images';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './App.module.css';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!searchText) return;

      setIsLoading(true);
      try {
        const { hits, totalHits } = await getPhotos(searchText, page);
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }

        setPhotos(prevPhotos => [...prevPhotos, ...hits]);
        setShowButton(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchText, page]);

  const handleSubmit = searchText => {
    setSearchText(searchText);
    setPage(1);
    setPhotos([]);
    setIsEmpty(false);
    setShowButton(false);
    setIsOpenModal(false);
    setModalImage('');
    setImageAlt('');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = ({ modalImage, imageAlt }) => {
    setIsOpenModal(true);
    setModalImage(modalImage);
    setImageAlt(imageAlt);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setModalImage('');
    setImageAlt('');
  };

  return (
    <div className={styles.app}>
      <Searchbar handleSubmit={handleSubmit} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onOpenModal={handleOpenModal} />
      )}
      {showButton && <Button onClick={handleLoadMore} text="Load more" />}
      {isEmpty && <p className={styles.text}>There are no photos...</p>}
      {isLoading && <Loader />}
      {isOpenModal && (
        <Modal img={modalImage} src={imageAlt} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
