import React from 'react';

export default function CartPage({ addtocart }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {addtocart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                addtocart.map((item, index) => (
                    <div key={index} className="border p-2 mb-2">
                        <h3>{item.product_name}</h3>
                        <p>{item.product_description}</p>
                        <strong>₹{item.product_price}</strong>
                    </div>
                ))
            )}
        </div>
    );
}
