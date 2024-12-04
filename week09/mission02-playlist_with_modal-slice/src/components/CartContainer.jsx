import CartItem from "./cartItem";
import cartItems from "../constants/cartItems";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import styled from "styled-components";
import { openModal } from "../features/modal/modalSlice";

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
            <CartDiv>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </CartDiv>
            <footer>
                <hr/>
                <div className="cart-total">
                    <h4>
                        총 가격 <span>\ {total}원</span>
                    </h4>
                </div>
                <button className="btn clear-btn" 
                    onClick={() => {
                        dispatch(openModal());
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
    // height: 100vh;

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
        width: 170px;
        height: 50px;
        margin-bottom: 20px;

        font-size: 1rem;
        background-color: white;
        border: 1px solid red;
        border-radius: 10px;
        color: red;

        &:hover {
            background-color: #EAC8C9;
            font-weight: bold;
        }
    }
`

const CartDiv = styled.div`
    min-height: 300px;
`