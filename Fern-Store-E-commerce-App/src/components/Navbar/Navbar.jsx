import '../Navbar/navbar.css';
import { logo } from "assets/index";

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuth, useProduct, useSlider } from "contexts/index";
import { getTotalItemInCart } from "utils/cart/cart";
import { useToast } from 'custom-hooks/useToast';

const Navbar = () => {
    const navigate = useNavigate();
    const { state: { searchText, cart, wishlist }, dispatch } = useProduct();
    const { totalItem } = getTotalItemInCart(cart);
    const { auth: { token, isAuth }, setAuth } = useAuth();
    const { slider, setSlider } = useSlider();
    const { showToast } = useToast();
    const [showProfileModal, setProfileModal] = useState();

    const logoutUser = () => {
        dispatch({
            type: "LOGOUT"
        });
        setAuth({
            token: '',
            user: {},
            isAuth: false
        });
        accountModalHandler();
        showToast('Logged out successfuly', 'success');
        localStorage.clear();
        navigate('/');
    }
    const sliderHandler = () => {
        setSlider(currentSliderState => !currentSliderState);
    }
    let totalWishlistItems = isAuth ? wishlist.length : 0;
    let totalCartItems = isAuth ? cart.length : 0;

    const searchFormHandler = e => {
        e.preventDefault();
        navigate('/Products');
    }

    const accountModalHandler = () => {
        setProfileModal(false);
    }

    return (
        <header className="navbar-home">
            <nav className="navbar-wrapper">
                <div className="navbar-left-aligned">
                    <svg
                        className="sidebar-toggler"
                        id="sidebar-toggler"
                        viewBox="0 0 100 40"
                        width="40"
                        height="40"
                        onClick={() => sliderHandler()}
                    >
                        <rect width="60" height="10"></rect>
                        <rect y="20" width="60" height="10"></rect>
                        <rect y="40" width="60" height="10"></rect>
                    </svg>
                    <div className="logo-wrapper"><img src={logo} className="responsive-img" /></div>
                    <Link className="brand-logo mx-2" to="/">FERN</Link>

                    <ul className="navbar-nav navbar-nav-collapse">
                        <li className="nav-item">
                            <Link to='/' className='nav-item-link'>HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/Products' className='nav-item-link'>PRODUCT</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-right-aligned">
                    <form className="search-bar" onSubmit={searchFormHandler}>
                        <button className="search-bar__btn" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                        <input
                            className="search-bar-input"
                            type="text"
                            id="product"
                            placeholder="Search item here"
                            value={searchText}
                            onChange={(e) => dispatch({ type: 'SEARCH_BY', payload: e.target.value })}
                        />
                    </form>
                    <ul className="navbar-nav navbar-fixed">
                        <li className="nav-item">
                            <div className="nav-icon-link no-link-style">
                                <span className="nav-icon badge-container"
                                    onClick={() => token
                                        ? navigate('/Cart')
                                        : navigate('Login')}
                                >
                                    <i className="fas fa-shopping-bag"></i>
                                    {totalCartItems > 0 && <span className="btn-badge d-flex justify-center items-center">{totalItem}</span>}
                                </span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon-link no-link-style">
                                <span className="nav-icon badge-container"
                                    onClick={() => token
                                        ? navigate('/Wishlist')
                                        : navigate('Login')}
                                >
                                    <i className="fas fa-heart"></i>
                                    {totalWishlistItems > 0 && <span className="btn-badge d-flex justify-center items-center">{wishlist.length}</span>}
                                </span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                className="nav-icon-link no-link-style"
                                onClick={() => setProfileModal(prevState => !prevState)}><i className=" nav-icon fas fa-user-circle"></i></div>
                        </li>

                        <div className={`details-overlay ${showProfileModal ? 'open' : ''}`}>

                        </div>
                        <div className={`profile-option ${showProfileModal ? 'show' : ''}`}>
                            <ul>
                                <Link to='/address' className="profile-item" onClick={accountModalHandler}>
                                    <div className="icon-wrapper"><i className="fas fa-map-marker-alt"></i></div>
                                    Address
                                </Link>
                                <Link className="profile-item" to='/user-profile' onClick={accountModalHandler}>
                                    <div className="icon-wrapper"><i className="fas fa-edit"></i></div>
                                    Profile Details
                                </Link>
                                {isAuth
                                    ? <li className="profile-item" onClick={() => logoutUser()}>
                                        <i className="fas fa-arrow-right-from-bracket"></i>
                                        Sign Out
                                    </li>
                                    : <Link className="profile-item" to='/Login' onClick={accountModalHandler}>
                                        <i className="fas fa-logout"></i>
                                        Login
                                    </Link>

                                }
                            </ul>
                        </div>
                    </ul>
                </div>
                <div className={`sidebar-wrapper ${slider ? 'show' : ''}`} id="sidebar-wrapper">
                    <div className={`sidebar ${slider ? 'view' : ''}`} id="sidebar">
                        <ul className="sidebar-list sidebar-collapse">
                            <Link className="sidebar-item hide" to='/user-profile' onClick={() => setSlider(false)}>
                                <i className="profile-icon fas fa-user"></i>
                            </Link>
                            <Link className="sidebar-item" to='/' onClick={() => setSlider(false)}>
                                Home
                            </Link>
                            <Link className="sidebar-item" to='/Products' onClick={() => setSlider(false)}>
                                Product
                            </Link>
                            <Link className="sidebar-item hide" to="/Cart" onClick={() => setSlider(false)}>
                                View Cart
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export { Navbar };