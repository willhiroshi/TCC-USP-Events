import { CSSProperties } from 'react';

const style: { [key: string]: CSSProperties } = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
  },
  homeContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
};

export default style;
