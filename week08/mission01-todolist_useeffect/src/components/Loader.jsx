// src/components/Loader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => (
    <SpinnerWrapper>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      {/* <p>게시글을 불러오는 중입니다..</p> */}
    </SpinnerWrapper>
);
  
export default Loader;

// 공중부양 애니메이션 정의
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); /* 공중으로 떠오르는 높이 조정 */
  }
`;

// 로딩 스피너 스타일
const SpinnerWrapper = styled.div`
  display: flex;
//   flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;  /* 동그라미 사이 간격 */
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: ${bounce} 1.2s ease-in-out infinite;
  
  &:nth-child(1) {
    animation-delay: 0s;
    background-color: #094C98;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #234F7E;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #6474FF;
  }

  &:nth-child(4) {
    animation-delay: 0.6s;
    background-color: #97A1AE;
  }
`;