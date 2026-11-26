import { useCart } from "../../context/CartContext";
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const Cart = () => {

    // 2. Obtenemos el estado 'cart' y las funciones que necesitemos del  contexto
    const { cart, clearCart, getCartTotal, removeItem } = useCart();
    
    // Si el carrito está vacío, mostramos un mensaje
    if (cart.length === 0) {
        return (
            <div>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
                <br></br>
                <Link to="/reservas" className="btn-volver">
                    Volver a Eventos
                </Link>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }

    // Si hay productos, los mostramos
    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <h4>{item.fecha}</h4>
                    {item.cantMayores > 0 && <p>{item.cantMayores} mayores: $ {item.cantMayores * item.cantMayores} </p>}
                    {item.cantMenores > 0 && <p>{item.cantMenores} menores: $ {item.cantMenores * item.cantMenores} </p>}
                    <p>Subtotal: ${item.precioMayores * item.cantMayores + item.precioMenores * item.cantMenores}</p>
                </div>
            ))}
            <hr />
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <button onClick={clearCart}>Vaciar Carrito</button>
        </div>
    );
};

export default Cart;