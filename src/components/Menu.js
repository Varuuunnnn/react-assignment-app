import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  container: {
    margin: '20px',
  },
  links: {
    margin: '20px',
  },
};

const Menu = () => {
  return (
    <>
      <div style={styles.container}>
        <NavLink style={styles.links} to="/">
          Filter
        </NavLink>
        <NavLink style={styles.links} to="/labels">
          Labels
        </NavLink>
      </div>
    </>
  );
};

export default Menu;
