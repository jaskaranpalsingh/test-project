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

    // Get dynamic storage key based on authentication status
    const getWishlistStorageKey = () => {
        const userInfo = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null;
        return userInfo?.email ? `wishlist_${userInfo.email}` : "wishlist_guest";
    };

    // Helper to identify database objects
    const isDbProduct = (product) => {
        const id = product?._id || product?.id;
        return typeof id === "string" && id.length === 24;
    };

    // Load initial wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            const token = getUserToken();
            const storageKey = getWishlistStorageKey();
            
            // Load local cached items for the current key
            const localWish = localStorage.getItem(storageKey)
                ? JSON.parse(localStorage.getItem(storageKey))
                : [];

            if (token) {
                setLoading(true);
                try {
                    // Check if there are any guest items to sync/merge
                    const guestWish = localStorage.getItem("wishlist_guest")
                        ? JSON.parse(localStorage.getItem("wishlist_guest"))
                        : [];

                    // Fetch DB wishlist
                    const res = await API.get("/wishlist", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    let dbWishlist = res.data || [];

                    if (guestWish.length > 0) {
                        let syncedSome = false;
                        for (const item of guestWish) {
                            const productId = item._id || item.id;
                            const isDbId = typeof productId === "string" && productId.length === 24;
                            const alreadyInDb = dbWishlist.some(dbItem => dbItem._id === productId);

                            if (isDbId && !alreadyInDb) {
                                try {
                                    await API.post(
                                        "/wishlist",
                                        { productId },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                        }
                                    );
                                    syncedSome = true;
                                } catch (syncErr) {
                                    console.error("Failed to sync guest item to DB:", productId, syncErr);
                                }
                            }
                        }

                        // Clear guest wishlist since it's merged
                        localStorage.removeItem("wishlist_guest");

                        // If synced items, refetch updated database list
                        if (syncedSome) {
                            const resUpdate = await API.get("/wishlist", {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            dbWishlist = resUpdate.data || [];
                        }
                    }

                    // Separate guest/local mock items (items that don't have database ObjectId)
                    const localHardcoded = localWish.filter(item => !isDbProduct(item));
                    const guestHardcoded = guestWish.filter(item => !isDbProduct(item));
                    
                    // Combine non-DB hardcoded items from current user cache + guest cache
                    const allHardcoded = [...localHardcoded, ...guestHardcoded].filter(
                        (item, index, self) => self.findIndex(t => (t.id === item.id || t._id === item._id)) === index
                    );

                    const combined = [...dbWishlist, ...allHardcoded];
                    setWishlistItems(combined);
                    localStorage.setItem(storageKey, JSON.stringify(combined));
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
        const storageKey = getWishlistStorageKey();
        const productId = product._id || product.id;

        const exists = wishlistItems.some(
            item => (item._id && item._id === product._id) || (item.id && item.id === product.id)
        );

        let updatedWishlist = [];

        if (token && isDbProduct(product)) {
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
                const hardcodedItems = wishlistItems.filter(item => !isDbProduct(item));
                updatedWishlist = [...dbWishlist, ...hardcodedItems];
            } catch (err) {
                console.error("Failed to sync wishlist toggle with backend:", err);
                if (exists) {
                    updatedWishlist = wishlistItems.filter(
                        item => (item._id && item._id !== product._id) || (item.id && item.id !== product.id)
                    );
                } else {
                    updatedWishlist = [...wishlistItems, product];
                }
            }
        } else {
            if (exists) {
                updatedWishlist = wishlistItems.filter(
                    item => (item._id && item._id !== product._id) || (item.id && item.id !== product.id)
                );
            } else {
                updatedWishlist = [...wishlistItems, product];
            }
        }

        setWishlistItems(updatedWishlist);
        localStorage.setItem(storageKey, JSON.stringify(updatedWishlist));
    };

    // Remove wishlist item directly
    const removeFromWishlist = async (productId) => {
        const token = getUserToken();
        const storageKey = getWishlistStorageKey();
        const isDbId = typeof productId === "string" && productId.length === 24;

        let updatedWishlist = [];

        if (token && isDbId) {
            try {
                const res = await API.delete(`/wishlist/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const dbWishlist = res.data.wishlist || [];
                const hardcodedItems = wishlistItems.filter(item => !isDbProduct(item));
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
        localStorage.setItem(storageKey, JSON.stringify(updatedWishlist));
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
