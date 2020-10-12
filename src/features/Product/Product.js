import React from 'react';

import './Product.css';

function Product({ name, price, children }) {
  return (
    <div className="Product">
      <h3 className="Product__title">{name}</h3>
      <span className="Product__price">{price} $</span>
      <div className="Product__footer">{children}</div>
    </div>
  );
}

export default Product;
