import { css } from 'emotion';

export const sidebarContainer = css`
  display: flex;
  width: 30%;
  height: 100vh;
  overflow-y: scroll;
  flex-direction: column;

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

export const datePickerContainer = css`
  display: flex;
  margin: 20px;
  flex-direction: column;
  gap: 15px;
`;

export const eventInfoContainer = css`
  display: flex;
  margin: 20px;
  flex-direction: column;
  gap: 20px;
`;

export const iconsEventInfoContainer = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const textIcon = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
