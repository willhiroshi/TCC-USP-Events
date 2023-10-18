import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  outsideContainer: {
    backgroundColor: '#f7f4ef',
    display: 'flex',
    width: '100%',
    height: '100vh'
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    padding: '20px',
    paddingTop: 0,
    width: '100%'
  },
  header: {
    padding: '20px 0'
  },
  subheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'begin',
    padding: '15px 0'
  },
  button: {
    maxHeight: '30px'
  }
};

export default styles;
