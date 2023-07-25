

import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';



function Home() {
  const navigate = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        // console.log("hi",response)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const clickAccount = () => {
    const cookieValue = getCookie('access-token');

    console.log(cookieValue)
    if (cookieValue) {
      navigate.push("/uploads")
    } else {
      navigate.push("/login")
    }
  }
  return (
    <div>

      <header>

        <Link to="/" className='pipcorn'>PIPCORN</Link>

      </header>

      <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" className='icon' alt=" " onClick={clickAccount} />
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product._id}>

              <a href={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="prod-info">
                <a href={`/product/${product._id}`}>
                  <p>{product.name}</p>
                </a>
                <p>
                  <strong>Price : {product.price}</strong>
                </p>

                <a href={`/product/${product._id}`} >Add to cart</a>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home






