import { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';
import styled from 'styled-components';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch]);

  return (
    <AppWrapper>
      <header>
        <Navbar/>
      </header>
      <main>
        <CartContainer/>
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
`