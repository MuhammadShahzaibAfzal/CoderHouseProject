const Card = ({ image, title, children }) => {
  return (
    <div className="card bgSecondary">
      <div className="headingContainer">
        {image && <img src={image} alt="heading icon" />}
        <h3>{title}</h3>
      </div>
      <div className="bodyContainer txtSecondary">{children}</div>
    </div>
  );
};

export default Card;
