// src/pages/search.style.jsx
import styled from "styled-components";
// import { Link } from 'react-router-dom';

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;

    input {
        flex: 1;
        padding: 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
    }

    button {
        width: 80px;
        background-color: deeppink;
        color: white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`

const MovieGridContainer = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
`

export { SearchContainer, MovieGridContainer }