import { useOutletContext } from "react-router-dom"
import { removeItem, setItem } from "./cart"
import { findObjectById, displayPrice } from "./utils"
import { LoadingSpinner } from "./LoadingSpinner"
import styles from "./Checkout.module.css"

export const Checkout = () => {
    const [cart, setCart, products] = useOutletContext()

    const removeFromCart = (id) => {
        setCart(removeItem(cart, id))
    }

    return (
        <main>
            <h1>Your Cart</h1>
            {products.length ?
                <section>
                    <table className={styles.products}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(basket => {
                                const product = findObjectById(products, basket.id)
                                return (
                                    <CartRow {...product} key={basket.id} quantity={basket.quantity}>
                                        <button onClick={() => removeFromCart(basket.id)}>remove</button>
                                    </CartRow>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
                :
                <LoadingSpinner />
            }
        </main>
    )
}

const CartRow = ({ 
    id = null, 
    title = "NOTITLE", 
    price = 0,
    quantity = 1, 
    image = "",
    children
}) =>
    <tr className={styles.product}>
        <td><img src={image} alt={title} /></td>
        <td>{title}</td>
        <td>{displayPrice(price)}</td>
        <td>{quantity}</td>
        <td>{children}</td>
    </tr>
