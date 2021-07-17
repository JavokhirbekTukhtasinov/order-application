import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
const Cart = (props) => {
	const toggle = useSelector((state) => state.ui.cartIsVisible);
	const items = useSelector((state) => state.cart.items);
	return (
		<div>
			{toggle && (
				<Card className={classes.cart}>
					<h2>Your Shopping Cart</h2>
					<ul>
						{items.map((item) => (
							<CartItem
								key={item.id}
								item={{
									id       : item.id,
									title    : item.name,
									quantity : item.quantity,
									total    : item.totalPrice,
									price    : item.price
								}}
							/>
						))}
					</ul>
				</Card>
			)}
		</div>
	);
};

export default Cart;
