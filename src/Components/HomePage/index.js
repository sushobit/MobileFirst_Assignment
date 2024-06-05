import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import './index.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
  });
  const productsPerPage = 8; // Number of products per page

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('https://fakestoreapi.com/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle form input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission to add new product
  const handleSubmit = e => {
    e.preventDefault();
    const { title, description, image, price } = newProduct;

    // Example: Validate inputs before adding (you can add more validation logic here)
    if (title && description && image && price) {
      const newProductData = {
        id: products.length + 1, // Example: Generate unique ID (replace with actual logic)
        title,
        description,
        image,
        price,
      };

      // Update products state by prepending new product to the list
      setProducts(prevProducts => [newProductData, ...prevProducts]);

      // Clear form fields after submission
      setNewProduct({
        title: '',
        description: '',
        image: '',
        price: '',
      });
    }
  };

  return (
    <div className="homepage">
      <h1 className="heading">Products</h1>

      {/* Form to add new product */}
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={newProduct.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <div className="product-card-container">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ul className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <li
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
