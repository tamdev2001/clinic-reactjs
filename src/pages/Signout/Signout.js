import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '~/actions/auth';

function Signout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch(logout());
    navigate('/sign-in');
    window.location.reload();
}

export default Signout;
