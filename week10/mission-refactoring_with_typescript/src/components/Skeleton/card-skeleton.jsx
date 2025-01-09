// src/components/Skeleton/card-skeleton.jsx
import * as S from './card-skeleton.style'

const CardSkeleton = () => {
    return (
        <S.SkeletonConatiner>
            <S.CardMain/>
            <S.CardTextWrapper>
                <S.TitleBox></S.TitleBox>
                <S.DescriptBox></S.DescriptBox>
            </S.CardTextWrapper>
        </S.SkeletonConatiner>
    )
};

export default CardSkeleton;