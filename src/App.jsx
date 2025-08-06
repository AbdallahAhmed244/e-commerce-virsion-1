import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
// Helper function to format currency
const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Header Component
const Header = ({ navigate, cartItemsCount, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-content">
          <div className="header-logo" onClick={() => navigate('home')}>MegaMart</div>
          <div className="header-delivery">Deliver to 423651</div>
          <div className="header-links">
            <button className="header-link-button">Track your order</button>
            <button className="header-link-button" onClick={() => navigate('members')}>Members</button>
            <button className="header-link-button" onClick={() => { setSearchTerm('discounted'); navigate('home'); }}>Offers</button>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="container header-main-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search essentials, groceries and more"
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
          <div className="header-actions">
            <button className="header-action-button" onClick={() => navigate('signUp')}>Sign Up/Sign in</button>
            <button className="header-action-button cart-button" onClick={() => navigate('cart')}>
              Cart ({cartItemsCount})
            </button>
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <div className="container nav-list-container">
          <ul className="nav-list">
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('groceries'); navigate('home'); }}>Groceries</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('fruits'); navigate('home'); }}>Premium Fruits</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('home kitchen'); navigate('home'); }}>Home & Kitchen</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('fashion'); navigate('home'); }}>Fashion</button></li>
            <li><button className="nav-item-button" onClick={() => navigate('mobiles')}>Mobiles</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('electronics'); navigate('home'); }}>Electronics</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('beauty'); navigate('home'); }}>Beauty</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('home improvement'); navigate('home'); }}>Home Improvement</button></li>
            <li><button className="nav-item-button" onClick={() => { setSearchTerm('sports toys luggage'); navigate('home'); }}>Sports, Toys & Luggage</button></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = ({ navigate }) => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-section">
          <h3 className="footer-section-title">MegaMart</h3>
          <p className="footer-contact-text" onClick={() => navigate('emailUs')}>Contact Us</p>
          <p className="footer-contact-item">Whats App: +1202-918-2132</p>
          <p className="footer-contact-item">Call Us: +1202-918-2132</p>
          <p className="footer-download-text">Download App</p>
          <div className="app-download-buttons">
            <button className="app-button">App Store</button>
            <button className="app-button">Google Play</button>
          </div>
          <div className="social-media-links">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Most Popular Categories</h3>
          <ul className="footer-list">
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Baby Care</li>
            <li>Vegetables & Fruits</li>
            <li>Snacks & Foods</li>
            <li>Dairy & Bakery</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Customer Services</h3>
          <ul className="footer-list">
            <li onClick={() => navigate('members')}>About Us</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>E-waste Policy</li>
            <li>Cancellation & Return Policy</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-section-title">Newsletter</h3>
          <p className="footer-newsletter-text">Subscribe to get special offers, free giveaways, and new product announcements.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <div className="payment-methods">
            <span>Payment Methods:</span>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
          <p>&copy; 2022 All rights reserved Reliance Retail Ltd</p>
        </div>
      </div>
    </footer>
  );
};

// Product Card Component
const ProductCard = ({ product, navigate, setSelectedProduct, addToCart, isAddedToCart }) => {
  const price = parseFloat(product.price);
  const discountPercentage = parseFloat(product.discountPercentage);
  const originalPrice = price / (1 - discountPercentage / 100);
  const displayOriginalPrice = isNaN(originalPrice) ? price : originalPrice;
  return (
    <div className="product-card">
      <div className="product-discount-badge">{discountPercentage}% OFF</div>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-card-image"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/200x150/f0f0f0/888888?text=No+Image` }}
      />
      <h3 className="product-card-title">{product.title}</h3>
      <p className="product-card-price">{formatCurrency(price)}</p>
      <p className="product-card-original-price">
        <span className="strikethrough">{formatCurrency(displayOriginalPrice)}</span>
      </p>
      <div className="product-card-actions">
        <button
          className="product-card-button view-details-button"
          onClick={() => {
            setSelectedProduct(product);
            navigate('productDetail');
          }}
        >
          View Details
        </button>
        <button
          className={`product-card-button add-to-cart-button ${isAddedToCart ? 'added-to-cart' : ''}`}
          onClick={() => {
            addToCart(product);
            navigate('cart');
          }}
        >
          <span className="cart-icon">🛒</span> {isAddedToCart ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  );
};

// Mobiles Page Component
const MobilesPage = ({ navigate, setSelectedProduct, cartItems, setCartItems }) => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('popularity');
  
  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products/category/smartphones');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMobiles(data.products);
      } catch (e) {
        setError('Failed to fetch mobile products. Please try again later.');
        console.error('Error fetching mobile products:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchMobiles();
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const filteredMobiles = mobiles.filter(mobile => {
    if (filter === 'all') return true;
    if (filter === 'premium' && mobile.price > 500) return true;
    if (filter === 'budget' && mobile.price <= 500) return true;
    return false;
  });

  const sortedMobiles = [...filteredMobiles].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'popularity') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} setSearchTerm={() => {}} />
      <main className="main-content">
        <div className="mobiles-page-header">
          <h1 className="mobiles-page-title">Mobile Phones</h1>
          <p className="mobiles-page-subtitle">Find the perfect smartphone for your needs</p>
          
          <div className="mobiles-filters">
            <div className="filter-group">
              <label htmlFor="price-filter">Price Range:</label>
              <select 
                id="price-filter" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Phones</option>
                <option value="budget">Budget Phones (Under ₹500)</option>
                <option value="premium">Premium Phones (Over ₹500)</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="sort-filter">Sort By:</label>
              <select 
                id="sort-filter" 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="filter-select"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p className="loading-text">Loading mobile products...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <section className="product-section">
              <div className="product-grid">
                {sortedMobiles.length > 0 ? (
                  sortedMobiles.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      navigate={navigate}
                      setSelectedProduct={setSelectedProduct}
                      addToCart={addToCart}
                      isAddedToCart={cartItems.some(item => item.id === product.id)}
                    />
                  ))
                ) : (
                  <p className="no-products-message">No mobile products found matching your criteria.</p>
                )}
              </div>
            </section>
            
            {sortedMobiles.length > 0 && (
              <div className="mobiles-features">
                <h2 className="section-title">Why Choose Our Mobile Phones?</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h3>Latest Models</h3>
                    <p>Get the newest smartphones with cutting-edge technology and features</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🔋</div>
                    <h3>Extended Battery Life</h3>
                    <p>Phones with all-day battery performance for uninterrupted usage</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📸</div>
                    <h3>Professional Camera</h3>
                    <p>Capture stunning photos with advanced camera systems</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🔄</div>
                    <h3>Easy Exchange</h3>
                    <p>Simple exchange policy for your old devices</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Home Page Component
const HomePage = ({ navigate, setSelectedProduct, cartItems, setCartItems, searchTerm, setSearchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (e) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const displayedProducts = products.filter(product => {
    const matchesSearchTerm = searchTerm ? (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : true;
    
    const matchesDiscount = searchTerm === 'discounted' ? product.discountPercentage > 0 : true;
    
    return matchesSearchTerm && matchesDiscount;
  });

  const smartphones = displayedProducts.filter(p => p.category === 'smartphones');
  const electronicsBrands = displayedProducts.filter(p => ['smartphones', 'laptops', 'fragrances', 'skincare', 'automotive'].includes(p.category));
  const dailyEssentials = displayedProducts.filter(p => ['groceries', 'home-decoration', 'furniture', 'lighting', 'kitchen-accessories'].includes(p.category));
  const discountedProducts = displayedProducts.filter(p => p.discountPercentage > 0).slice(0, 8);

  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} setSearchTerm={setSearchTerm} />
      <main className="main-content">
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p className="loading-text">Loading products...</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <section className="banner-section smart-watch-banner">
              <div className="banner-content">
                <p className="banner-text-small">Best Deal Online on smart watches</p>
                <h2 className="banner-title">SMART WEARABLE.</h2>
                <p className="banner-discount">UP to 80% OFF</p>
              </div>
            </section>
            
            {searchTerm === 'discounted' && (
              <section className="product-section">
                <h2 className="section-title">Discounted Products</h2>
                <div className="product-grid">
                  {discountedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      navigate={navigate}
                      setSelectedProduct={setSelectedProduct}
                      addToCart={addToCart}
                      isAddedToCart={cartItems.some(item => item.id === product.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="product-section">
              <h2 className="section-title">Grab the best deal on Smartphones</h2>
              <div className="product-grid">
                {smartphones.slice(0, 4).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigate={navigate}
                    setSelectedProduct={setSelectedProduct}
                    addToCart={addToCart}
                    isAddedToCart={cartItems.some(item => item.id === product.id)}
                  />
                ))}
              </div>
              <button className="view-all-button" onClick={() => navigate('mobiles')}>View All Mobiles </button>
            </section>
            <section className="category-section">
              <h2 className="section-title">Shop From Top Categories</h2>
              <div className="category-grid">
                <div className="category-item" onClick={() => setSearchTerm('smartphones')}>Mobile</div>
                <div className="category-item" onClick={() => setSearchTerm('skincare')}>Cosmetics</div>
                <div className="category-item" onClick={() => setSearchTerm('laptops')}>Electronics</div>
                <div className="category-item" onClick={() => setSearchTerm('furniture')}>Furniture</div>
                <div className="category-item" onClick={() => setSearchTerm('watch')}>Watches</div>
                <div className="category-item" onClick={() => setSearchTerm('decoration')}>Decor</div>
                <div className="category-item" onClick={() => setSearchTerm('accessories')}>Accessories</div>
              </div>
              <button className="view-all-button" onClick={() => { setSearchTerm(''); navigate('home'); }}>View All </button>
            </section>
            <section className="product-section">
              <h2 className="section-title">Top Electronics Brands</h2>
              <div className="brand-grid">
                {electronicsBrands.slice(0, 4).map(product => (
                  <div key={product.id} className="brand-item">
                    <img
                      src={product.thumbnail}
                      alt={product.brand}
                      className="brand-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x100/f0f0f0/888888?text=${product.brand || 'Brand'}` }}
                    />
                    <p className="brand-name">{product.brand ? product.brand.toUpperCase() : 'N/A'}</p>
                    <p className="brand-discount">UP to 80% OFF</p>
                  </div>
                ))}
              </div>
              <button className="view-all-button" onClick={() => { setSearchTerm('electronics'); navigate('home'); }}>View All </button>
            </section>
            <section className="product-section">
              <h2 className="section-title">Daily Essentials</h2>
              <div className="daily-essentials-grid">
                {dailyEssentials.slice(0, 6).map(product => (
                  <div key={product.id} className="daily-essential-item">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="daily-essential-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/f0f0f0/888888?text=${product.title}` }}
                    />
                    <p className="daily-essential-title">{product.title}</p>
                    <p className="daily-essential-discount">UP to 50% OFF</p>
                  </div>
                ))}
              </div>
              <button className="view-all-button" onClick={() => { setSearchTerm('groceries'); navigate('home'); }}>View All </button>
            </section>
          </>
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = ({ navigate, selectedProduct, addToCart, cartItems }) => {
  if (!selectedProduct) {
    useEffect(() => {
      navigate('home');
    }, [navigate]);
    return null;
  }
  const originalPrice = selectedProduct.price / (1 - selectedProduct.discountPercentage / 100);
  const isAddedToCart = cartItems.some(item => item.id === selectedProduct.id);
  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} setSearchTerm={() => {}} />
      <main className="main-content product-detail-main">
        <div className="product-detail-card">
          <div className="product-detail-image-gallery">
            <img
              src={selectedProduct.images[0] || `https://placehold.co/300x200/f0f0f0/888888?text=No+Image`}
              alt={selectedProduct.title}
              className="product-detail-main-image"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/f0f0f0/888888?text=No+Image` }}
            />
            <div className="product-detail-thumbnails">
              {selectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedProduct.title} thumbnail ${index + 1}`}
                  className="product-detail-thumbnail"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/f0f0f0/888888?text=No+Image` }}
                />
              ))}
            </div>
          </div>
          <div className="product-detail-info">
            <h2 className="product-detail-title">{selectedProduct.title}</h2>
            <p className="product-detail-brand">Brand: {selectedProduct.brand}</p>
            <p className="product-detail-category">Category: {selectedProduct.category}</p>
            <p className="product-detail-description">{selectedProduct.description}</p>
            <p className="product-detail-price-current">{formatCurrency(selectedProduct.price)}</p>
            <p className="product-detail-price-original">
              Original Price: <span className="strikethrough">{formatCurrency(originalPrice)}</span>
            </p>
            <p className="product-detail-discount">{selectedProduct.discountPercentage}% OFF</p>
            <p className="product-detail-stock">In Stock: {selectedProduct.stock}</p>
            <button
              className={`product-detail-add-to-cart-button ${isAddedToCart ? 'added-to-cart' : ''}`}
              onClick={() => {
                addToCart(selectedProduct);
                navigate('cart');
              }}
            >
              <span className="cart-icon">🛒</span> {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              className="product-detail-back-button"
              onClick={() => navigate('home')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Cart Page Component
const CartPage = ({ navigate, cartItems, setCartItems }) => {
  const removeItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} setSearchTerm={() => {}} />
      <main className="main-content cart-main">
        <h2 className="page-title">Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-items-container">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="cart-item-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/f0f0f0/888888?text=No+Image` }}
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">{formatCurrency(item.price)}</p>
                  <div className="cart-item-quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button
                  className="cart-item-remove-button"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-summary">
              <p className="cart-total">Total: {formatCurrency(totalAmount)}</p>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        )}
        <button className="back-to-home-button" onClick={() => navigate('home')}>Continue Shopping</button>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Sign Up Page Component
const SignUpPage = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up Attempt:', { email, password });
    alert('Sign Up functionality is simulated. In a real app, this would register your account!');
    navigate('home');
  };
  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={0} setSearchTerm={() => {}} />
      <main className="main-content center-content">
        <div className="card contact-card">
          <h2 className="contact-title">Sign Up</h2>
          <form onSubmit={handleSignUp} className="sign-up-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>
          <p className="contact-note">Already have an account? <span className="link-text" onClick={() => navigate('home')}>Sign In (simulated)</span></p>
          <button className="back-to-home-button" onClick={() => navigate('home')}>Back to Home</button>
        </div>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Members Page Component
const MembersPage = ({ navigate }) => {
  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={0} setSearchTerm={() => {}} />
      <main className="main-content center-content">
        <div className="members-page-container">
          <h1 className="members-page-title">Our Valued Members</h1>
          <div className="members-grid">
            <div className="member-card">
              <div className="member-avatar">A</div>
              <h3 className="member-name">Abdallah ahmed</h3>
              <p className="member-tier"><b>Leader</b></p>
              <button className="member-contact-btn">Contact</button>
            </div>
            <div className="member-card">
              <div className="member-avatar">M</div>
              <h3 className="member-name">Menna hany</h3>
              <p className="member-tier"> Member</p>
              <button className="member-contact-btn">Contact</button>
            </div>
            <div className="member-card">
              <div className="member-avatar">S</div>
              <h3 className="member-name">Steven Hany</h3>
              <p className="member-tier">Member</p>
              <button className="member-contact-btn">Contact</button>
            </div>
            <div className="member-card">
              <div className="member-avatar">L</div>
              <h3 className="member-name">Liala Ayman</h3>
              <p className="member-tier"> Member</p>
              <button className="member-contact-btn">Contact</button>
            </div>
            
          </div>
          <div className="membership-benefits">
            <h2 className="benefits-title">Membership Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎁</div>
                <h3>Exclusive Offers</h3>
                <p>Get access to special discounts and early sales</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚚</div>
                <h3>Free Delivery</h3>
                <p>Enjoy free shipping on all orders</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔄</div>
                <h3>Easy Returns</h3>
                <p>30-day hassle-free returns policy</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📞</div>
                <h3>Dedicated Support</h3>
                <p>Priority customer service</p>
              </div>
            </div>
          </div>
          <button className="back-to-home-button" onClick={() => navigate('home')}>Back to Home</button>
        </div>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Email Us Page Component
const EmailUsPage = ({ navigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email Sent:', { name, email, subject, message });
    alert('Your message has been sent! (simulated)');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    navigate('home');
  };
  return (
    <div className="page-wrapper">
      <Header navigate={navigate} cartItemsCount={0} setSearchTerm={() => {}} />
      <main className="main-content center-content">
        <div className="card contact-card">
          <h2 className="contact-title">Email Us</h2>
          <form onSubmit={handleSubmit} className="email-form">
            <div className="form-group">
              <label htmlFor="emailName">Your Name:</label>
              <input
                type="text"
                id="emailName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailAddress">Your Email:</label>
              <input
                type="email"
                id="emailAddress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailSubject">Subject:</label>
              <input
                type="text"
                id="emailSubject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailMessage">Message:</label>
              <textarea
                id="emailMessage"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-email-button">Send Message</button>
          </form>
          <button className="back-to-home-button" onClick={() => navigate('home')}>Back to Home</button>
        </div>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPath, setCurrentPath] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = (path) => {
    setCurrentPath(path);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const renderPage = () => {
    switch (currentPath) {
      case 'home':
        return <HomePage navigate={navigate} setSelectedProduct={setSelectedProduct} cartItems={cartItems} setCartItems={setCartItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'mobiles':
        return <MobilesPage navigate={navigate} setSelectedProduct={setSelectedProduct} cartItems={cartItems} setCartItems={setCartItems} />;
      case 'productDetail':
        return <ProductDetailPage navigate={navigate} selectedProduct={selectedProduct} addToCart={addToCart} cartItems={cartItems} />;
      case 'cart':
        return <CartPage navigate={navigate} cartItems={cartItems} setCartItems={setCartItems} />;
      case 'signUp':
        return <SignUpPage navigate={navigate} />;
      case 'members':
        return <MembersPage navigate={navigate} />;
      case 'emailUs':
        return <EmailUsPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} setSelectedProduct={setSelectedProduct} cartItems={cartItems} setCartItems={setCartItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
    }
  };

  return (
    <div className="App">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        
        `}
      </style>
      {renderPage()}
    </div>
  );
};

export default App;