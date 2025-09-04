import { useEffect, useState } from "react";

const CartPage = ({ setIsLoggedIn }) => {
    const [orders, setOrders] = useState([]);
    const url = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        fetch(`${url}placed-orders`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // Filter out orders where product_id is null
                    const validOrders = data.orders.filter(order => order.item?.product_id);
                    setIsLoggedIn(true)
                    setOrders(validOrders);
                } else {
                    alert("Failed to load cart");
                }
            });
    }, [url]);

    return (
        <div>
            <h2>Your Cart</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                orders.map((order, index) => {
                    const product = order.item.product_id;
                    return (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                            <h4>{product.product_name}</h4>
                            <p>Price: ₹{product.product_price}</p>
                            <p>Quantity: {order.item.quantity}</p>
                            <p>Total: ₹{order.total_amount}</p>
                            <img
                                src={`${url}${product.image?.filepath}`}
                                alt={product.product_name}
                                width="100"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CartPage;
