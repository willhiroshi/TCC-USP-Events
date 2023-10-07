import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  eventInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  iconsEventInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  textIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px'
  }
};

export default styles;
