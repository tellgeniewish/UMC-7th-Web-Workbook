// src/features/cart/cartSlice.js
import {createSlice} from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

const initialState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState, // key와 value값이 같으면 생략 ㄱㄴ! initialState: initialState
    reducers: {
        // TODO: 증가
        // increase: (state, action) => {
        //     console.log("state, action=", state, action)
        // }
        increase: (state, {payload}) => {
            // 내가 클릭한 음반의 id를 갖고옴
            const itemId = payload;
            // 그 id를 통해서, 전체 음반 중에, 내가 클릭한 id랑 비교해서 같은 음반을 찾아냄
            const item = state.cartItems.find((cartItems) => cartItems.id === itemId);
            console.log("고른 item만=", item);
            // 내가 클릭한 아이템이 무엇인지 찾았으니, 걔의 수량을 증가시켜줌
            item.amount += 1;
        },
        // TODO: 감소
        decrease: (state, {payload}) => {
            // 내가 클릭한 음반의 id를 갖고옴
            const itemId = payload;
            // 그 id를 통해서, 전체 음반 중에, 내가 클릭한 id랑 비교해서 같은 음반을 찾아냄
            const item = state.cartItems.find((cartItems) => cartItems.id === itemId);
            console.log("고른 item만=", item);
            // 내가 클릭한 아이템이 무엇인지 찾았으니, 걔의 수량을 감소시켜줌
            item.amount -= 1;
        },
        // TODO: 아이템 제거
        removeItem: (state, {payload}) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        // TODO: 모든 아이템 제거 (clear)
        clearCart: (state) => {
            state.cartItems = [];
        },
        // TODO: TOTAL을 계산. SUM(각각의 아이템 * 수량)
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    }
})

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer