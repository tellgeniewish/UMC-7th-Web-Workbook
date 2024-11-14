// src/components/Skeleton/card-list-skeleton.jsx
import CardSkeleton from './card-skeleton'

const CardListSkeleton = ({number}) => {
    return (
        new Array(number).fill(0).map((_, idx) => <CardSkeleton key={idx}/>)
    )
};

export default CardListSkeleton;