import { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';
import styled from 'styled-components';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import useStore from './store/useStore'; // Zustand 사용

function App() {
  // const dispatch = useDispatch();
  // const { cartItems } = useSelector((store) => store.cart);
  // const { isOpen } = useSelector((store) => store.modal)
  const { cartItems, isOpen, calculateTotals } = useStore();

  useEffect(() => {
    //dispatch(calculateTotals())
    calculateTotals();
  // }, [cartItems, dispatch]);
  }, [cartItems, calculateTotals]);

  return (
    <AppWrapper>
      <header>
        <Navbar/>
      </header>
      <main>
        <CartContainer/>
        {isOpen && 
          <ModalPortal>
            {/* <h4>children</h4> */}
            <Modal>
              <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        }
      </main>
      <footer>
        <Footer/>
      </footer>
    </AppWrapper>
  )
}

export default App;

const AppWrapper = styled.div`
  background-color: #EFF3F6;
  margin: -6px;
  // max-width: 750px;

  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`