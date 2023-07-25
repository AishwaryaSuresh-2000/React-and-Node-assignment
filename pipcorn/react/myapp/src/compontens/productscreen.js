// ProductScreen.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductScreen() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(productId)
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      <header>
        <a href="/">pipcorn</a>
      </header>
      <main>
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.details}</p>
            <p>Rating :{product.rating}</p>
           
            <p>Number of reviews:{product.numberofreviews}</p>
             <p> <strong>Price: {product.price}</strong>
            </p>
            <Link to="/" className='back'>back</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductScreen;




