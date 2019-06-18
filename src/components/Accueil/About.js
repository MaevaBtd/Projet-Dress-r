// == Import: Yarn
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSocks, faTshirt, faMitten } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
// == Import: local
import './About.scss';

// == Code
const About = () => (
  <div id="about">
    <h2>Gestion de garde-robe</h2>
    <Carousel autoplay>
      <div>
        <h3><img src="src/data/assets/outfit.jpg" alt="" /></h3>
      </div>
      <div>
        <h3><img src="src/data/assets/main.jpg" alt="" /></h3>
      </div>
      <div>
        <h3><img src="src/data/assets/cloth.jpg" alt="" /></h3>
      </div>
      <div>
        <h3><img src="src/data/assets/random.jpg" alt="" /></h3>
      </div>
    </Carousel>
    <FontAwesomeIcon size="2x" className="icon" icon={faTshirt} />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloremque voluptate aperiam, exercitationem totam est enim rem,
    molestiae soluta voluptatum voluptas iure deleniti.
    Quas excepturi hic quos natus sunt nesciunt ducimus.
    </p>
    <FontAwesomeIcon size="2x" className="icon" icon={faSocks} />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloremque voluptate aperiam, exercitationem totam est enim rem,
    molestiae soluta voluptatum voluptas iure deleniti.
    Quas excepturi hic quos natus sunt nesciunt ducimus. Lorem ipsum,
    dolor sit amet consectetur adipisicing elit. Corrupti at ullam minima.
    </p>
    <FontAwesomeIcon size="2x" className="icon" icon={faMitten} />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloremque voluptate aperiam, exercitationem totam est enim rem,
    molestiae soluta voluptatum voluptas iure deleniti.
    </p>
  </div>
);

// == Export
export default About;
