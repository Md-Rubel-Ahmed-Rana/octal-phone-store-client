import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoute = ({children}) => {
   const {user} = useContext(AuthContext);
    const location = useLocation()

   if(!user && !user?.email){
        return <Navigate to="/login" state={{from: location}} replace />
    }
    return children

};

export default PrivateRoute;