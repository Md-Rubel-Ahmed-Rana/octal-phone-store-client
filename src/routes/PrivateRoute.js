import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoute = ({children}) => {
   const {loading} = useContext(AuthContext);
   
    if (loading){
        return <h3>Loading...</h3>
    }
    return children
};

export default PrivateRoute;