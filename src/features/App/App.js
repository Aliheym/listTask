import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';

import Basket from '../Basket/Basket';
import ProductsList from '../ProductsList/ProductsList';

import './App.css';

const initialState = [
  {
    id: 1,
    name: 'Banana',
    price: 10,
  },
  {
    id: 2,
    name: 'Apple',
    price: 20,
  },
  {
    id: 3,
    name: 'Papaya',
    price: 10,
    discount: 5,
    discountRepeat: 3,
  },
];

function App() {
  const [products] = useState(initialState);
  const [basketProducts, setBasketProducts] = useState([]);

  const addBasketProduct = (productId, count) => {
    setBasketProducts(
      basketProducts.concat({
        id: productId,
        count,
      })
    );
  };

  const updateBasketProduct = (productId, count) => {
    setBasketProducts(
      basketProducts.map((product) => {
        if (productId === product.id) {
          return {
            ...product,
            count,
          };
        }

        return product;
      })
    );
  };

  const removeBasketProduct = (productId) => {
    setBasketProducts(
      basketProducts.filter((product) => product.id !== productId)
    );
  };

  const onBasketProductChanged = (productId, count) => {
    const product = basketProducts.find((product) => productId === product.id);

    if (product) {
      const newCount = count + product.count;

      if (newCount <= 0) {
        removeBasketProduct(productId);
      } else {
        updateBasketProduct(productId, newCount);
      }
    } else if (count > 0) {
      addBasketProduct(productId, count);
    }
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Link to="/basket" className="App__btn">
              Basket
              <span className="App__badge">{basketProducts.length}</span>
            </Link>
            <ProductsList
              items={products}
              onAddProduct={onBasketProductChanged}
            />
          </Route>
          <Route exact path="/basket">
            <Link to="/" className="App__btn">
              Products List
            </Link>
            <Basket
              items={basketProducts}
              products={products}
              onRemoveProduct={onBasketProductChanged}
              onRemoveAllProducts={removeBasketProduct}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
