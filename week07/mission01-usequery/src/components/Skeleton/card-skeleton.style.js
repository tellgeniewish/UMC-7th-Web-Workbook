// src/components/Skeleton/card-skeleton.style.jsx
import styled, {keyframes} from "styled-components";

const skeleton = keyframes`
    0% {
        opacity: 1;
    }
    30% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.4;
    }
    80% {
        opacity: 0.0;
    }
    100% {
        opacity: 1;
    }
`

const SkeletonConatiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const CardMain = styled.div`
    width: 140px;
    height: 210px;
    // background-color: light-gray;
    background: rgb(230, 230, 230);
    border-radius: 10px;
    overflow: hidden;

    animation: ${skeleton} 5s 1s infinite linear alternate;
`
const CardTextWrapper = styled.div`
    width: 140px;
    height: 30px;

    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 5px;
`

const TitleBox = styled.div`
    background: rgb(230, 230, 230);
    height: 14px;
    border-radius: 5px;

    animation: ${skeleton} 3s 1s infinite linear alternate;
`

const DescriptBox = styled.div`
    background: rgb(230, 230, 230);
    height: 10px;
    border-radius: 5px;

    animation: ${skeleton} 3s 1s infinite linear alternate;
`

export { SkeletonConatiner, CardMain, CardTextWrapper, TitleBox, DescriptBox }