import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormInput from '~/components/FormInput';
import request from '~/utils/httpRequest';

function SignIn() {
    const navidate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const signInData = Object.fromEntries(new FormData(e.target).entries());
        request.post('auth/signin', signInData).then((data) => {
            if (data.status == 200) {
                request.get('auth/curent-username').then((user) => console.log(user));
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormInput lable="User name" placeholder="Enter username..." name="username" />
            <FormInput lable="Password" placeholder="Enter password..." name="password" />
            <Button type="submit">Sign in</Button>
        </Form>
    );
}

export default SignIn;
