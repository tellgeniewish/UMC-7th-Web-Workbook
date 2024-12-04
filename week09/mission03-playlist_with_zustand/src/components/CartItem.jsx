// src/components/CartItem.jsx
import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import styled from "styled-components";
import useCartStore from '../store/cartStore'; // Zustand 사용
import useModalStore from '../store/modalStore'; // Zustand 사용
import useStore from "../store/useStore"; // Zustand 사용

const CartItem = ({id, title, singer, price, img, amount}) => {
    // const dispatch = useDispatch();
    const { increase, decrease, removeItem } = useStore();

    return (
        <CartWrapper className="cart-item">
            <img src={img} alt={`${title} 이미지`}/>
            <MusicName>
                <h4>
                    {title} | {singer}
                </h4>

                <h4 className="item-price">\ {price}</h4>
            </MusicName>
            <CheckAmount>
                <button className="amount-btn" 
                        // onClick={() => dispatch(increase(id))}>
                        onClick={() => increase(id)}> {/* */}
                    <ChevronUp/>
                </button>
                <p className="amount">{amount}</p>

                <button className="amount-btn" onClick={() => {
                        if (amount === 1) {
                            // dispatch(removeItem(id));
                            removeItem(id);
                            return;
                        }
                        // dispatch(decrease(id))
                        decrease(id);
                        }
                    }>
                    <ChevronDown/>
                </button>
            </CheckAmount>
        </CartWrapper>
    )
};

export default CartItem;

const CartWrapper = styled.article`
    width: 100%;
    margin: 10px;
    display: flex;
    font-size: 0.8rem;

    img {
        width: 100px;
        height: 100px;
        margin: 10px;
    }
`

const MusicName = styled.div`
    width: 500px;
`
const CheckAmount = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 50px;

    .amount-btn {
        width: 30px;
        height: 30px;
        border: 2px solid transparent;;
        background-color: #EFF3F6;
        color: #5852FE;

        &:hover {
            border: #646cffaa;
        }
    }
`