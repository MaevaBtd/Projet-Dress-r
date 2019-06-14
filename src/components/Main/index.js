// == Import: Yarn
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

// == Import: local
import './Main.scss';

// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    
    if (!isAuthenticated) return <Redirect to="/" />;

    return (
      <div id="main">
        <div id="main-container">
          <NavLink to="/wardrobe"><h1 className="vertical">Ma garde-robe</h1></NavLink>
          <NavLink to="/random"><h1 className="vertical">Tenue Aléatoire</h1></NavLink>
          <NavLink to="/add-new-cloth"><h1 className="horizontal">Ajouter un vêtement</h1></NavLink>
        </div>
      </div>
    );
  }
}


// == Export
export default Main;
