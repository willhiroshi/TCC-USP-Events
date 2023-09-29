import { css } from 'emotion';

export const body = css`
  display: flex;
`;

export const listItemText = (isSideBarOpen: boolean) => css`
  opacity: ${isSideBarOpen ? '1' : '0'};
  color: black;
  font-size: 12px;
`;
