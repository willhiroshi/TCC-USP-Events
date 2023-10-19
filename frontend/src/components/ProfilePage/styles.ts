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
    padding: '0 20px',
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
  infoHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  infoText: {
    textAlign: 'center',
    justifyContent: 'end'
  },
  button: {
    maxHeight: '30px'
  }
};

export default styles;
