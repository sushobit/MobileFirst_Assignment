import React from 'react'
import './index.css'

const ProductCard = ({ product }) => {
    const { image, title, price, description, category, rating } = product;
  
    return (
      <div className="product-card">
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p><strong>Price:</strong> {price}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Rating:</strong> {rating.rate} ({rating.count} reviews)</p>
      </div>
    );
  };

export default ProductCard
