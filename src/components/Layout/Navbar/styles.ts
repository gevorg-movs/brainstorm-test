const styles = {
   root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: '100%',
      backgroundColor: '#2D3347',
   },
   header: {
      height: 80,
      background: '#272D3E',
   },
   menuList: {
      margin: 0,
      padding: 0,
   },
   menuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 30px',
      textDecoration: 'none',
      color: '#788195',
      minHeight: '40px',
      backgroundColor: '#2D3347',
   },
   menuItemActive: {
      backgroundColor: '#1F2430',
   },
   menuItemIcon: {
      minWidth: 'unset',
      marginRight: '31px',
   },
   childItem: {
      padding: '12px 30px 12px 100px',
      textDecoration: 'none',
      color: '#788195',
      minHeight: '30px',
      backgroundColor: '#2D3347',
      display: 'block',
   },
}

export default styles
