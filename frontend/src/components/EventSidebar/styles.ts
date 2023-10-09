import { css } from 'emotion';

export const scrollbar = css`
  overflow-y: scroll;
  height: 100vh;
  width: 30%;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cbcbcb;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 0.1px solid #b7b7b7;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #909090;
  }
`;

export const sidebarContainer = css`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 15px;
`;
