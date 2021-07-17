import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
	const cartQantity = useSelector((state) => state.cart.totalQuantity);
	const dispatch = useDispatch();
	console.log(cartQantity);
	const toggleHandler = () => {
		dispatch(uiActions.toggle());
	};

	return (
		<button className={classes.button} onClick={toggleHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQantity}</span>
		</button>
	);
};

export default CartButton;
