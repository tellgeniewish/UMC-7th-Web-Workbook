import { useSelector } from 'react-redux';
// import { CartIcon, CartItem } from '../constants/icons';
import styled from 'styled-components';

const Navbar = () => {
    const { amount } = useSelector((state) => state.cart);
    
    return (
        <NavWrapper>
            <div className='nav-center'>
                <h3>REAL DATA UMC PLAYLIST</h3>
                <div className='nav-container'>
                    {/* <CartIcon/> */}🛒
                    <div className='amount-container'>
                        <p className='total-amount'>{amount}</p>
                    </div>
                </div>
            </div>
        </NavWrapper>
    );
};

export default Navbar;

const NavWrapper = styled.nav`
    // width: 100%;
    background-color: #5852FE;
    color: white;

    .nav-center {
        padding: 10px;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    
    .nav-container {
        display:flex;
        flex-direction: row;
        align-items: center;
    }
`