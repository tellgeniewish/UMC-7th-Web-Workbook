import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import styled from "styled-components";

const ModalButton = () => {
    const dispatch = useDispatch();

    return (
        <ModalBtnWrapper className="btn-container">
            <button type="button" 
                    className="btn confirm-btn" 
                    onClick={() => {
                        dispatch(clearCart());
                        // TODO: 모달도 꺼지는 상태를 연결
                        dispatch(closeModal());                    
            }}>
                네
            </button>
            <button type="button" 
                    className="btn clear-btn" 
                    onClick={() => {dispatch(closeModal());}}>
                아니요
            </button>
        </ModalBtnWrapper>
    );
};

export default ModalButton;

const ModalBtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    .btn {
        width: 70px;
        height: 30px;
        border-radius: 10px;

        &:hover {
            font-weight: bold;
        }
    }

    .confirm-btn {
        background-color: white;
        border: 1px solid blue;
        color: blue;

        &:hover {
            background-color: #646cff;
        }
    }
    .clear-btn {
        background-color: white;
        border: 1px solid red;
        color: red;

        &:hover {
            background-color: #EAC8C9;
        }
    }
`