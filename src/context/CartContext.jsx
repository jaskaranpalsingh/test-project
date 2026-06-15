import { createContext, useContext, useState, useEffect } from 'react';
import { useWishlist } from './WishlistContext';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { removeFromWishlist } = useWishlist();

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const productId = product._id || product.id;
        if (productId) {
            removeFromWishlist(productId);
        }

        const normalizedProduct = {
            ...product,
            id: product.id || product._id
        };

        setCartItems(prev => {
            const existing = prev.find(item => item.id === normalizedProduct.id);
            if (existing) {
                return prev.map(item =>
                    item.id === normalizedProduct.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...normalizedProduct, qty: 1 }];
        });
        setIsCartOpen(true); // auto-open sidebar when item added
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQty = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQty, clearCart,
            isCartOpen, setIsCartOpen, totalItems, subtotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
