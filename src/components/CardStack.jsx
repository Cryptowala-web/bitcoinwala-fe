import React, { useState, useEffect } from 'react';
import './CardStack.css';

const bufferToBase64 = (buffer) => {
  const binary = new Uint8Array(buffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ''
  );
  return window.btoa(binary);
};




const CardStack = ({ data }) => {
  const [cards, setCards] = useState([]);
  const [animationClass, setAnimationClass] = useState('');
  const [modalData, setModalData] = useState(null);

  useEffect(() => {

    if (!data || data.length === 0) return;

    const animationTypes = ['cards', 'card-stacks', 'cards-split', 'cards-split-delay'];
    const animation =
      data.length > 3
        ? 'card-stacks'
        : animationTypes[Math.floor(Math.random() * animationTypes.length)];

    const processed = data.map((item, index) => ({
      image: item.image_data
        ? `data:image/jpeg;base64,${bufferToBase64(item.image_data.data)}`
        : `https://picsum.photos/400/250?random=${index + 1}`,
      title: item.title,
      description: item.description,
      date: new Date(item.expiry_date).toLocaleDateString(),
      views: item.click_count || 0,
    }));

    setCards(processed);
    setAnimationClass(animation);
  }, [data]);

  const handleCardClick = (e) => {
    if (!e.target.closest('.eye-button')) {
      e.currentTarget.classList.toggle('transition');
    }
  };

  const openModal = (card) => setModalData(card);
  const closeModal = () => setModalData(null);

//   setCards(staticData)

  if (cards.length === 0) {
    return <p style={{ textAlign: 'center' }}>Loading Announcements...</p>;
  }
  

  return (
    <div>
      <header className="hero">
        <h1>News Letter</h1>
        <p>Announcements are good to go.</p>
      </header>

      <ul className={animationClass} onClick={handleCardClick}>
        {cards.map((card, index) => (
          <li className={`card card-${index + 1}`} key={index}>
            <img src={card.image} alt={card.title} />
            <div className="content">
              <h3 style={{ color: "black" }}>
                {card.title.length > 20 ? `${card.title.slice(0, 20)}...` : card.title}
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
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <img src={modalData.image} alt={modalData.title} />
            </div>
            <div className="modal-body">
              <h2>{modalData.title}</h2>
              <p>{modalData.description}</p>
              <div className="modal-details">
                <h3>Additional Details</h3>
                <ul>
                  <li><strong>Date:</strong> {modalData.date}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardStack;


// import React, { useState, useEffect } from 'react';
// import './CardStack.css';

// const bufferToBase64 = (buffer) => {
//   const binary = new Uint8Array(buffer).reduce(
//     (data, byte) => data + String.fromCharCode(byte),
//     ''
//   );
//   return window.btoa(binary);
// };

// const CardStack = ({ data }) => {
//   const [cards, setCards] = useState([]);
//   const [animationClass, setAnimationClass] = useState('');
//   const [modalData, setModalData] = useState(null);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const animationTypes = ['cards', 'card-stacks', 'cards-split', 'cards-split-delay'];
//     const animation =
//       data.length > 3
//         ? 'card-stacks'
//         : animationTypes[Math.floor(Math.random() * animationTypes.length)];

//     const processed = data.map((item, index) => ({
//       image: item.image_data
//         ? `data:image/jpeg;base64,${bufferToBase64(item.image_data.data)}`
//         : `https://picsum.photos/400/250?random=${index + 1}`,
//       title: item.title,
//       description: item.description,
//       date: new Date(item.expiry_date).toLocaleDateString(),
//       views: item.click_count || 0,
//     }));

//     setCards(processed);
//     setAnimationClass(animation);
//   }, [data]);

//   const handleCardClick = (e) => {
//     if (!e.target.closest('.eye-button')) {
//       e.currentTarget.classList.toggle('transition');
//     }
//   };

//   const openModal = (card) => setModalData(card);
//   const closeModal = () => setModalData(null);

//   if (cards.length === 0) {
//     return <p className="loading-text">Loading Announcements...</p>;
//   }

//   return (
//     <div>
//       <header className="hero">
//         <h1>News Letter</h1>
//         <p>Announcements are good to go.</p>
//       </header>

//       <ul className={animationClass} onClick={handleCardClick}>
//         {cards.map((card, index) => (
//           <li className={`card card-${index + 1}`} key={index}>
//             <img src={card.image} alt={card.title} />
//             <div className="content">
//               <h3>
//                 {card.title.length > 30 ? `${card.title.slice(0, 30)}...` : card.title}
//               </h3>
//               <p>
//                 {card.description.length > 80
//                   ? `${card.description.slice(0, 80)}...`
//                   : card.description}
//               </p>
//               <button
//                 className="eye-button"
//                 onClick={() => openModal(card)}
//                 title="View Details"
//               >
//                 👁
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {modalData && (
//         <div className="modal show" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={closeModal}>&times;</span>
//             <div className="modal-header">
//               <img src={modalData.image} alt={modalData.title} />
//             </div>
//             <div className="modal-body">
//               <h2>{modalData.title}</h2>
//               <p>{modalData.description}</p>
//               <div className="modal-details">
//                 <h3>Additional Details</h3>
//                 <ul>
//                   <li><strong>Date:</strong> {modalData.date}</li>
//                   <li><strong>Views:</strong> {modalData.views}</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardStack;


