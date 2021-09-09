const Card = ({ card, pickCard }) => {
  return (
    <div
      className={`card-box ${card.blocked && 'blocked'} ${card.active && 'active'}`}
    >
      <div className='card-content'>
        <img
          draggable={false}
          src={card.img}
          alt='card-img'
          onClick={() => {
            !card.blocked && !card.active && pickCard(card.id, card.value);
          }}
        />
      </div>
    </div>
  );
};

export default Card;
