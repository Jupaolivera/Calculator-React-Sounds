import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    justify-content: center;
    align-content: center;
    width: 400px;
    margin: 40px auto;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: minmax(120px, auto) repeat(5, 100px);
    box-shadow: 4px 4px 20px #333;
    border-radius: 10px;
    border: 2px ridge #333;
`;

export const Screen = styled.div`
    grid-column: 1 / -1; //columnas principio a fin
    background-color: rgba(60, 64, 67, 0.7);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 10px;
    word-wrap: break-word;
    word-break: break-all;
    text-align: right;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 2px ridge #333;
    border-top: 0px; //evita double border
`;

export const Previous = styled.div`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.5rem;
`;

export const Current = styled.div`
    color: white;
    font-size: 2.5rem;
`;

export const Button = styled.button`
    cursor: pointer;
    font-size: 2rem;
    border: 0.5px outset white;
    outline: none;
    background-color: rgba(255, 255, 255, 0.7);
    &:hover {
        background-color: transparent;
    }

    ${({ gridSpan }) => gridSpan && `grid-column: span ${gridSpan};`}
    ${({ operation }) => operation && `background-color: gray;`}
    ${({ control }) => control && `background-color: rgba(135, 206, 235, 0.7);`}
    ${({ equals }) =>
        equals && `border-bottom-right-radius: 10px; background-color: gray;`}
    ${({ period }) =>
        period &&
        `border-bottom-left-radius: 10px; background-color: rgba(200, 206, 235, 0.7);`}
`;
