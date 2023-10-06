const styles = {
  sidebarButton: (isSelected: boolean) => ({
    minHeight: 48,
    justifyContent: 'initial',
    pl: 3,
    gap: '5px',
    backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.10)' : 'transparent',

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.10)'
    }
  }),
  sidebarIcon: {
    minWidth: 0,
    justifyContent: 'center'
  },
  sidebarButtonText: {
    color: 'black',
    fontSize: '12px'
  }
};

export default styles;
