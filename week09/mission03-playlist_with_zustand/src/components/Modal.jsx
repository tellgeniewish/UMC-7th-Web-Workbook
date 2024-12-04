// src/components/Modal.jsx
import ModalButton from './ModalButton';
import styled from 'styled-components';

const Modal = ({children}) => {
  return (
    <ModalContainer className='modal-container' onClick={(e) => {}}>
        <ModalContent className='modal'>
            {children}
            <ModalButton/>
        </ModalContent>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalContent = styled.div`
  width: 380px;
  height: 100px;

  background-color: white;
  border-radius: 10px;

  position: fixed;
  top: 35%;
  left: 35%; 

  display: flex;
  flex-direction: column;
  align-items: center;
`