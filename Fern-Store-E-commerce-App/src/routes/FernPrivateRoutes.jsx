import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/';

const FernPrivateRoutes = () => {
    //const { authState: { isAuth } } = useAuth();
    const isAuth = localStorage.getItem('isAuth');
    return (isAuth ? <Outlet /> : <Navigate to="/Login" />)
}

export {FernPrivateRoutes};