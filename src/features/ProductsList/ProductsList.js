import React, { useState } from 'react';
import Product from '../Product/Product';

import './ProductList.css';

function ProductPage(props) {
  const { onAdd, ...other } = props;
  const [value, setValue] = useState(1);

  const onAddClicked = () => {
    onAdd(props.id, value);
    setValue(1);
  };

  return (
    <li>
      <Product {...other}>
        <input
          className="Product__input"
          type="number"
          value={value}
          onChange={(evt) => setValue(Number(evt.target.value))}
        />
        <button className="Product__btn" type="button" onClick={onAddClicked}>
          Add to basket
        </button>
      </Product>
    </li>
  );
}

function ProductsList({ items, onAddProduct }) {
  const renderProducts = () => {
    return items.map(({ id, name, price }) => (
      <ProductPage
        key={id}
        id={id}
        name={name}
        price={price}
        onAdd={onAddProduct}
      />
    ));
  };

  return <ul className="ProductsList">{renderProducts()}</ul>;
}

export default ProductsList;
