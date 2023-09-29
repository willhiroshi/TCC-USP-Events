import { css } from 'emotion';

export const body = css`
  display: flex;
`;

export const list = css`
  padding-left: 7px;
`;

export const listItemButton = (isSideBarOpen: boolean) => css`
  justify-content: ${isSideBarOpen ? 'initial' : 'initial'};
  align-items: center;
  padding-left: 23px;
`;

export const listItemIcon = (isSideBarOpen: boolean) => css`
  min-width: 0;
  margin-right: ${isSideBarOpen ? '3' : '0'};
  padding: 5px 5px 0 2px;
`;

export const listItemText = (isSideBarOpen: boolean) => css`
  opacity: ${isSideBarOpen ? '1' : '0'};
  color: black;
`;
