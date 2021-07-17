import { useDispatch } from 'react-redux';
import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';
const fetchCartData = async () => {
	return async () => {
		const dispatch = useDispatch();
		const fetchData = async () => {
			const response = await fetch('https://food-order-app-6155e-default-rtdb.firebaseio.com/cart.json');
			if (!response.ok) {
				throw new Error('Counld not fetch cart data!');
			}
			const data = await response.json();
			return data;
		};

		try {
			const cartData = await fetchCartData();
			dispatch(cartActions.replaceCart(cartData));
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status  : 'error',
					title   : 'Error',
					message : 'Sending cart data failed!'
				})
			);
		}
	};
};
export default fetchCartData;
