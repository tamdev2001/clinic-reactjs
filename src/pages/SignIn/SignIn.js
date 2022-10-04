import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Form from '~/components/Form';
import FormTitle from '~/components/FormTitle';
import Input from '~/components/Input';
import request from '~/utils/httpRequest';

function SignIn() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const signInData = Object.fromEntries(new FormData(e.target).entries());
        request.post('auth/signin', signInData).then((data) => {
            if (data.status === 200) {
                return navigate('/');
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle>Member Login</FormTitle>
            <Input lable="User name" placeholder="Enter username..." name="username" />
            <Input lable="Password" placeholder="Enter password..." name="password" />
            <Input type="submit" hidden />
            <Button login type="submit">
                Sign in
            </Button>
        </Form>
    );
}

export default SignIn;
