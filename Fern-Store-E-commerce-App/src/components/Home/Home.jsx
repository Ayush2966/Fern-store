import './home.css';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProduct } from 'contexts';

import { HeroImage}  from "assets/index";

export const Home = () => {
const [categories, setCateogries] = useState([]);
useEffect(() => {
    (async() => {
      const {data: {categories}} = await axios.get('/api/categories');
      setCateogries(() => categories);
    })();
}, []);
const {dispatch} = useProduct();
const navigate = useNavigate();

const categoryHandler= (catepgryName) => {
    dispatch({type: 'CATEOGRY', payload: {[catepgryName]: true}});
    navigate('/Products');
}

    return (
        <div className="landing-page-layout">
            <div className="hero-img-wrapper">
                <div className="text-overlay">
                    <h1 className="text-overlay-title">LIVE WITH NATURE</h1>
                    <button className="bttn bttn-primary bttn-lg">
                        <Link className="shop-btn" to="/Products">
                            SHOP NOW
                        </Link>
                    </button>
                </div>
                <a href="#">
                    <picture>
                        <img
                            className="home-page-banner responsive-img"
                            src={HeroImage}
                            alt="plants"
                        />
                    </picture>
                </a>
            </div>

            <div className="homepage-feature-section">
                <header className="homepage-feature-header py-4 text-center">
                    <h4 className="homepage-feature-title">Featured Cateogry</h4>
                </header>
                <div className="asideSection">
                    {categories.map( ({_id, img, categoryName}) => {
                        return(
                            <div className="feature-box mx-4" key={_id} onClick={() => categoryHandler(categoryName)}>
                                    <div className="feature-img">
                                        <img
                                            className="responsive-img homepage-feature-img"
                                            src={img}
                                            alt={categoryName}
                                        />
                                    </div>
                                    <p>{categoryName}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}