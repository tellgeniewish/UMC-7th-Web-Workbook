import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const ModalButton = () => {
    const dispatch = useDispatch();

    return (
        <div className="btn-container">
            <button type="button" 
                    className="btn confirm-btn" 
                    onClick={() => {
                        dispatchEvent(clearCart()
                        // TODO: 모달도 꺼지는 상태를 연결
                    )
            }}>
                네
            </button>
            <button type="button" 
                    className="btn clear-btn" 
                    onClick={() => {}}>
                아니요
            </button>
        </div>
    );
};

export default ModalButton;