/** 
 * @component index.js
 * @description 整个app页面初始布局
 * @time 2020-01-15 16:39
 * @author fishYu
 */


import React from 'react';
import styles from './index.css';
import Header from './Header';
import withRouter from 'umi/withRouter';

function Layout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Layout);


// import React from 'react';
// import BaseLayout from './BasicLayout';

// function BasicLayout(props) {
//   if (props.location.pathname === '/login' || props.location.pathname === '/register') {
//     return props.children;
//   }
//   return (
//     <BaseLayout
//       props={props}
//     />
//   );
// }

// export default BasicLayout;
