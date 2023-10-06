import { css } from 'emotion';

export const body = css`
  padding: 10px;
  background-color: #f7f4ef;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow-y: scroll;
`;

export const gridContainer = css`
  padding: 30px;
  padding-top: 20px;
  display: grid;
  gap: 5;
  grid-template-columns: repeat(2, 1fr);
  height: fit-content;
`;

export const gridItem = css`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const cardItem = css`
  height: fit-content;
  width: fit-content;
  border-radius: 5px;
  display: flex;
  justiy-content: center;
`;

export const cardHeader = css`
  background-color: #f4f2f3;
`;

export const cardContent = css`
  height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;
