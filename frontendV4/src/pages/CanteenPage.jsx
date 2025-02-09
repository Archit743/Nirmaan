import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CanteenPage.module.css";
import Header from "../components/Header";

const CanteenPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("https://nirmaan-yvtd.onrender.com/menu");
        if (!response.ok) throw new Error("Failed to fetch menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("jwt");
    return { Authorization: `Bearer ${token}` };
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((i) => i.item._id === item._id);
    if (existingItem) {
      setCartItems(cartItems.map(i => 
        i.item._id === item._id ? {...i, quantity: i.quantity + 1} : i
      ));
    } else {
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
    setMessage(`${item.name} added to cart!`);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(i => i.item._id !== itemId));
    setMessage("Item removed from cart!");
  };

  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const order = {
        studentId: user._id,
        items: cartItems.map(({ item, quantity }) => ({
          itemId: item._id,
          quantity
        })),
        schedule: new Date()
      };

      const response = await fetch("https://nirmaan-yvtd.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) throw new Error("Order failed");
      const orderData = await response.json();

      // Check if order ID exists
    if (!orderData.order || !orderData.order._id) {
      throw new Error("Failed to retrieve order ID");
    }

      // Process payment
      const paymentResponse = await fetch(
        `https://nirmaan-yvtd.onrender.com/payment/${orderData._id}`,
        { method: "POST",
           headers:{ ...getAuthHeader() }
        }
      );
      
      if (!paymentResponse.ok) throw new Error("Payment failed");
      
      setCartItems([]);
      setMessage("Order placed successfully!");
      // setTimeout(() => navigate("/orders"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );

  if (loading) return <div className={styles.loading}>Loading Menu...</div>;

  return (
    <div className={styles.container}>
      <Header />
      
      {message && <div className={styles.message}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.cartButton} onClick={() => setIsCartOpen(true)}>
        <i className="fas fa-shopping-cart"></i>
        {cartItems.length > 0 && <span>{cartItems.length}</span>}
      </div>

      {isCartOpen && (
        <div className={styles.cartOverlay}>
          <div className={styles.cart}>
            <div className={styles.cartHeader}>
              <h2>Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            
            {cartItems.length === 0 ? (
              <p className={styles.emptyCart}>Your cart is empty</p>
            ) : (
              <>
                {cartItems.map(({ item, quantity }) => (
                  <div key={item._id} className={styles.cartItem}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price} x {quantity}</p>
                    </div>
                    <button onClick={() => handleRemoveFromCart(item._id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                
                <div className={styles.total}>
                  <p>Total: ₹{totalPrice.toFixed(2)}</p>
                  <button onClick={handleCheckout} className={styles.checkout}>
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className={styles.menuContainer}>
        <h1>Canteen Menu</h1>
        
        <div className={styles.controls}>
          <div className={styles.search}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.menuGrid}>
          {menuItems
            .filter(item =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <div key={item._id} className={styles.menuItem}>
                <img src={item.photo} alt={item.name} />
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className={styles.itemFooter}>
                    <span>₹{item.price}</span>
                    <button onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CanteenPage;