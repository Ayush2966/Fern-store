import './user-profile.css';
import { useAuth } from "contexts";

export const UserProfile = () => {
    const { auth: { token, isAuth, user }, setAuth } = useAuth();
    console.log(user);
    return (
        <div className="general-wrapper">
            <div className="cart-wrapper items-center">
                <h5 className="cart-header py-4">My Profile</h5>
                <div className="order-summary-body profile-detail-wrapper d-flex">
                    <div className="order-detail d-flex flex-col">
                        <p className='order-detail-title bold'>Profile Details</p>
                        <div className="payment-detail">
                            <p className='no-margin-p py-2'>
                                <span className='bold mr-6'>Name: </span>{user.firstName} {user.lastName}</p>
                            <p className='no-margin-p py-2'>
                            <span className='bold mr-6'>Email: </span>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}