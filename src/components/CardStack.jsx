

import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './CardStack.css';

const CardStack = ({ data }) => {
  const [cards, setCards] = useState([]);
  const [animationClass, setAnimationClass] = useState('');
  const [modalData, setModalData] = useState(null);
  const bitlogo = "/biglog.png";

  useEffect(() => {
    if (!data || data.length === 0) return;

    const animationTypes = ['cards', 'card-stacks', 'cards-split', 'cards-split-delay'];
    const animation =
      data.length > 3
        ? 'card-stacks'
        : animationTypes[Math.floor(Math.random() * animationTypes.length)];

    const processed = data
      .filter(item => item.show_on_dashboard)
      .map((item) => ({
        image: item.image || bitlogo,
        title: item.title,
        description: item.description,
        date: item.expiry_date
          ? new Date(item.expiry_date).toLocaleDateString()
          : 'N/A',
      }));

    setCards(processed);
    setAnimationClass(animation);
  }, [data]);

  const handleCardClick = (e) => {
    if (modalData) return; // prevent animation toggle when modal is open
    if (!e.target.closest('.eye-button')) {
      e.currentTarget.classList.toggle('transition');
    }
  };

  const openModal = (card) => setModalData(card);
  const closeModal = () => setModalData(null);

  if (cards.length === 0) {
    return <p style={{ textAlign: 'center', color: 'white' }}>Loading Announcements...</p>;
  }

  return (
    <div className="parent-container">
      <header className="hero">
        <h1 className="h1-element">News Letter</h1>
        <p className="h1-element">Announcements are good to go.</p>
      </header>

      <ul className={animationClass} onClick={handleCardClick}>
        {cards.map((card, index) => (
          <li className={`card card-${index + 1}`} key={index}>
            <img src={card.image} alt={card.title} />
            <div className="content">
              <h3 className="h1-element" style={{ color: 'white',fontSize:"15px" }}>
                {card.title?.length > 20
                  ? `${card.title.slice(0, 20)}...`
                  : card.title || 'No Title'}
              </h3>
              <button
                className="eye-button"
                onClick={() => openModal(card)}
                title="View Details"
              >
                👁
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalData && (
        <div className="modal show" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <img src={modalData.image} alt={modalData.title} />
            </div>
            <div className="modal-body">
              <h2 className="h1-element">{modalData.title}</h2>
              <p>{modalData.description}</p>
              <div className="modal-details" style={{ color: 'white' }}>
                <ul>
                  <li>
                    <strong style={{color:"white"}}>Expiry Date:</strong> 
                    <span className='p-element'>{modalData.date}</span>
                  </li>
                </ul>
              </div>
            </div>
            <span className="close" onClick={closeModal}>
              <AiOutlineClose size={20} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardStack;

