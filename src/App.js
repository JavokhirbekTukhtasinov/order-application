import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { fetchCartData } from './store/cart-actions';
let isinitial = true;
function App() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const isShowNotification = useSelector((state) => state.ui.notification);
	console.log(isShowNotification);

	//UseEffect for fetching cart data
	useEffect(
		() => {
			dispatch(fetchCartData());
		},
		[ dispatch ]
	);

	//UseEffect for sending cart data
	useEffect(
		() => {
			if (!isShowNotification === null) {
				dispatch(
					uiActions.showNotification({
						status  : 'pending',
						title   : 'Sending',
						message : 'Sending cart data!'
					})
				);
			}
			const sendCartData = async () => {
				const response = await fetch('https://food-order-app-6155e-default-rtdb.firebaseio.com/cart.json', {
					method : 'PUT',
					body   : JSON.stringify(cart)
				});
				if (!response.ok) {
					throw new Error('Sending cart data failed');
				}

				dispatch(
					uiActions.showNotification({
						status  : 'success',
						title   : 'Success',
						message : 'Sending cart data successfully!'
					})
				);
			};

			if (isinitial) {
				isinitial = false;
				return;
			}
			sendCartData().catch((error) => {
				dispatch(
					uiActions.showNotification({
						status  : 'error',
						title   : 'Error',
						message : 'Sending cart data failed!'
					})
				);
			});
		},
		[ cart, dispatch, isShowNotification ]
	);
	return (
		<Fragment>
			{isShowNotification && (
				<Notification
					status={isShowNotification.status}
					title={isShowNotification.title}
					message={isShowNotification.message}
				/>
			)}

			<Layout>
				<Cart />
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
