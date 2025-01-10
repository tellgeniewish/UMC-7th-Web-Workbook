// src/components/Skeleton/card-list-skeleton.tsx
import React from 'react';
import CardSkeleton from './card-skeleton'

// Props 타입 정의
interface CardListSkeletonProps {
    number: number;
}

// const CardListSkeleton = ({number}) => {
const CardListSkeleton: React.FC<CardListSkeletonProps> = ({ number }) => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap', // 가로로 여러 개를 배치
            gap: '10px', // 간격 추가
        }}>
        {new Array(number).fill(0).map((_, idx) => <CardSkeleton key={idx}/>)}
        </div>
    )
};

export default CardListSkeleton;