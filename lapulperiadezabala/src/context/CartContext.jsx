import React, { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

// consumer - hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

// provider 
export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, cantMayores, cantMenores) => {

        if (cantMayores + cantMenores === 0) return;

        const idProducto = product.id;
        const itemInCart = cart.find(item => item.id === product.id);

        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, 
                        cantMayores: item.cantMayores + cantMayores, 
                        cantMenores: item.cantMenores + cantMenores }
                    : item
            );
            setCart(updatedCart);
            console.log("Se agrego porque el item existia. ");
        } else {
            setCart(prevCart => [...prevCart, { ...product, cantMayores, cantMenores }]);
            console.log("Se agrego uno nuevo: ");
            console.log({product});
        }   
    };

    const clearCart = () => {
        setCart([]);
    };

    // Retorna la cant de Mayores de un id.Producto
    const getCantMayores = (productId) => {
        const itemInCart = cart.find(item => item.id === productId);
        return itemInCart ? itemInCart.cantMayores : 0;
    };

    // Retorna la cant de Menores de un id.Producto
    const getCantMenores = (productId) => {
        const itemInCart = cart.find(item => item.id === productId);
        return itemInCart ? itemInCart.cantMenores : 0;
    };

    // NUEVA FUNCIÓN: Eliminar un producto del carrito
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    // NUEVA FUNCIÓN: Verificar si un producto ya está en el carrito
    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + (item.precioMayores * item.cantMayores) + (item.precioMenores * item.cantMenores),
            0);
    };

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.cantMayores + item.cantMenores, 0);
    };

    return (
        <CartContext.Provider 
            value={{
                cart, addToCart, clearCart,
                getCartQuantity, getCartTotal,
                getCantMayores, getCantMenores, 
                removeItem, 
                isInCart    
            }}>
                {children}
        </CartContext.Provider>
    );
};