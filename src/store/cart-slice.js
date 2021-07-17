import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name         : 'addItem',
	initialState : {
		items         : [],
		totalQuantity : 0
	},
	reducers     : {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},

		additemToCart(state, action) {
			const newItem = action.payload;
			const existItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			if (!existItem) {
				state.items.push({
					id         : newItem.id,
					price      : newItem.price,
					quantity   : 1,
					totalPrice : newItem.price,
					name       : newItem.title
				});
			} else {
				existItem.quantity++;
				existItem.totalPrice = existItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			if (existItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existItem.quantity--;
				existItem.totalPrice = existItem.quantity * existItem.price;
			}
		}
	}
});

export const cartActions = cartSlice.actions;
export default cartSlice;
