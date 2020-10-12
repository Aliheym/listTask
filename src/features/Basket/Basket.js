import React, { useState, useEffect } from 'react';
import Product from '../Product';

import { calculatePrice } from '../../utils/price';

import './Basket.css';

function BasketProduct(props) {
  const { onRemove, onRemoveAll, ...other } = props;
  const { id, count } = other;
  const [value, setValue] = useState(count);

  useEffect(() => {
    setValue(count);
  }, [count]);

  return (
    <li>
      <Product {...other}>
        <input
          className="Product__input"
          type="number"
          min="1"
          value={value}
          onChange={(evt) => setValue(Number(evt.target.value))}
        />
        <button
          className="Product__btn"
          type="button"
          onClick={() => onRemove(id, -value)}
        >
          Remove
        </button>
        <button
          className="Product__btn"
          type="button"
          onClick={() => onRemoveAll(id)}
        >
          Remove all
        </button>
      </Product>
    </li>
  );
}

function Basket({ items, products, onRemoveProduct, onRemoveAllProducts }) {
  const renderProducts = () => {
    return items.map(({ id, count }) => {
      const { name, price, issues } = products.find(
        (product) => product.id === id
      );

      return (
        <BasketProduct
          key={id}
          id={id}
          name={name}
          count={count}
          price={calculatePrice(count, price, issues)}
          onRemove={onRemoveProduct}
          onRemoveAll={onRemoveAllProducts}
        />
      );
    });
  };

  return (
    <div className="Basket">
      {items.length > 0 ? (
        <ul className="Basket__list">{renderProducts()}</ul>
      ) : (
        <div className="Basket__empty">Empty</div>
      )}
    </div>
  );
}

export default Basket;
