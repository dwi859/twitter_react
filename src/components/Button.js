import styled from "styled-components";

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size:1.0rem;
    background:blue;
    color:white;
    border-width:0px;
    border-radius:10px;
   
    &:hover{
        background: var(--lightlueB);
        color: var(--mainBlue);
    }
`;