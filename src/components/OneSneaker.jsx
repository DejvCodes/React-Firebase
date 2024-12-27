import "./OneSneaker.css"
import formatPrice from "../function/formatPrice"
import PropTypes from "prop-types"
import { LuShoppingBag } from "react-icons/lu"

const OneSneaker = ({ id, image, brand, title, price, deleteSneaker }) => {
  return <div className="one-sneaker">
    <img src={image} alt={title} />
    <h3>{brand}</h3>
    <h2>{title}</h2>
    <div className="price-and-btn">
      <p>{formatPrice(price)}</p>
      <button><LuShoppingBag /></button>
    </div>
    <button className="delete-btn" onClick={() => deleteSneaker(id)}>Vymazat</button>
  </div>
}

export default OneSneaker

// Validace props
OneSneaker.propTypes = {
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}