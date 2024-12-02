import CartItem from "./cartItem";
import cartItems from "../constants/cartItems";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import styled from "styled-components";

const CartContainer = () => {
    //const state = useSelector((store) => console.log(store));
    //const state = useSelector((store) => store.cart);
    //console.log(state);
    const { cartItems, total, amount } = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    
    return (
        <CartWrapper className="cart">
            <header>
                <h2>당신이 선택한 음반</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </div>
            <footer>
                <hr/>
                <div className="cart-total">
                    <h4>
                        총 가격 <span>\ {total}원</span>
                    </h4>
                </div>
                <button className="btn clear-btn" 
                    onClick={() => {
                        dispatch(clearCart());
                    }
                }>
                    장바구니 초기화
                </button>
            </footer>
        </CartWrapper>
    )
}

export default CartContainer;

const CartWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: 1.8rem;
    }

    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .cart-total {
        width: 50%;
        margin-bottom: 30px;
    }
    hr {
        width: 100%;
        height: 1px;
    }
    h4 {    
        display: flex;
        // flex-direction: row;
        justify-content: space-between;
    }

    .clear-btn {
        width: fit-content;
        margin-bottom: 20px;
    }
`