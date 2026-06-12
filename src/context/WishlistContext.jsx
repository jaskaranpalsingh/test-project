import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get auth token if available
    const getUserToken = () => {
        const userInfo = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null;
        return userInfo?.token || null;
    };

    // Load initial wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            const token = getUserToken();
            
            // 1. Load local wishlist (fallback/guest items)
            const localWish = localStorage.getItem("wishlist")
                ? JSON.parse(localStorage.getItem("wishlist"))
                : [];

            if (token) {
                setLoading(true);
                try {
                    const res = await API.get("/wishlist", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    
                    // DB items
                    const dbWishlist = res.data || [];
                    
                    // Merge local hardcoded items (non-mongodb-id items) with database items
                    const hardcodedItems = localWish.filter(item => !item._id);
                    
                    // Set combined list
                    const combined = [...dbWishlist, ...hardcodedItems];
                    setWishlistItems(combined);
                    
                    // Sync back hardcoded items to local storage only
                    localStorage.setItem("wishlist", JSON.stringify(combined));
                } catch (err) {
                    console.error("Error fetching wishlist from server:", err);
                    setWishlistItems(localWish);
                } finally {
                    setLoading(false);
                }
            } else {
                setWishlistItems(localWish);
            }
        };

        fetchWishlist();
    }, []);

    // Toggle wishlist item
    const toggleWishlist = async (product) => {
        const token = getUserToken();
        const productId = product._id || product.id; // Support both backend ObjectId and local mock Id

        // Helper to check if product is already in state
        const exists = wishlistItems.some(
            item => (item._id && item._id === product._id) || (item.id && item.id === product.id)
        );

        let updatedWishlist = [];

        if (token && product._id) {
            // Logged in and product has database ID -> sync with backend
            try {
                const res = await API.post(
                    "/wishlist",
                    { productId: product._id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                const dbWishlist = res.data.wishlist || [];
                // Retain any non-DB hardcoded items currently in state
                const hardcodedItems = wishlistItems.filter(item => !item._id);
                updatedWishlist = [...dbWishlist, ...hardcodedItems];
            } catch (err) {
                console.error("Failed to sync wishlist toggle with backend:", err);
                // Fallback to local toggle if API fails
                if (exists) {
                    updatedWishlist = wishlistItems.filter(
                        item => (item._id && item._id !== product._id) || (item.id && item.id !== product.id)
                    );
                } else {
                    updatedWishlist = [...wishlistItems, product];
                }
            }
        } else {
            // Guest mode or hardcoded item -> manage locally
            if (exists) {
                updatedWishlist = wishlistItems.filter(
                    item => (item._id && item._id !== product._id) || (item.id && item.id !== product.id)
                );
            } else {
                updatedWishlist = [...wishlistItems, product];
            }
        }

        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    // Remove wishlist item directly
    const removeFromWishlist = async (productId) => {
        const token = getUserToken();
        const isDbId = typeof productId === "string" && productId.length === 24; // MongoDB ObjectId heuristic

        let updatedWishlist = [];

        if (token && isDbId) {
            try {
                const res = await API.delete(`/wishlist/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const dbWishlist = res.data.wishlist || [];
                const hardcodedItems = wishlistItems.filter(item => !item._id);
                updatedWishlist = [...dbWishlist, ...hardcodedItems];
            } catch (err) {
                console.error("Failed to delete from wishlist on server:", err);
                updatedWishlist = wishlistItems.filter(
                    item => (item._id && item._id !== productId) || (item.id && item.id !== productId)
                );
            }
        } else {
            updatedWishlist = wishlistItems.filter(
                item => (item._id && item._id !== productId) || (item.id && item.id !== productId)
            );
        }

        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    // Check if item is wishlisted
    const isInWishlist = (productId) => {
        if (!productId) return false;
        return wishlistItems.some(
            item => (item._id && item._id.toString() === productId.toString()) || 
                    (item.id && item.id.toString() === productId.toString())
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                toggleWishlist,
                removeFromWishlist,
                isInWishlist,
                loading
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);
