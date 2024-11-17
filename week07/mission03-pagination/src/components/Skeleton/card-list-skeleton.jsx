// src/components/Skeleton/card-list-skeleton.jsx
import CardSkeleton from './card-skeleton'

const CardListSkeleton = ({number}) => {
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