// src/components/Skeleton/card-skeleton.tsx
import React from 'react';
import * as S from './card-skeleton.style'

// const CardSkeleton = () => {
const CardSkeleton: React.FC = () => {
    return (
        <S.SkeletonContainer>
            <S.CardMain/>
            <S.CardTextWrapper>
                <S.TitleBox></S.TitleBox>
                <S.DescriptBox></S.DescriptBox>
            </S.CardTextWrapper>
        </S.SkeletonContainer>
    )
};

export default CardSkeleton;