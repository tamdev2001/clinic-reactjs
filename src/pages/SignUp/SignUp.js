import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import FormInput from '~/components/FormInput';
import FormSelect from '~/components/FormSelect';
import request from '~/utils/httpRequest';

function SignUp() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const signUpData = Object.fromEntries(new FormData(e.target).entries());
        console.log(signUpData);
        request
            .post('auth/signup', {
                lastName: 'afsadfas',
                firstName: 'baaaa',
                phone: '0851249052',
                sex: 'nu',
                username: 'nhietbaaaaaaa',
                avatar: 'fjsdalf;fsdafsvvvvvv',
                password: '1',
                comfirmPassword: '1',
            })
            .then((user) => console.log(user));
    };
    return (
        <Form onSubmit={handleSubmit}>
            <FormInput lable="Last name" name="lastname" placeholder="" type="" />
            <FormInput lable="First name" name="firsname" placeholder="" type="" />
            <FormInput lable="Phone number" name="phone" placeholder="" type="" />
            <FormSelect
                name={'sex'}
                lable="sex"
                options={[
                    { value: 1, name: 'Nam' },
                    { value: 2, name: 'Nữ' },
                ]}
            />
            {/* <FormInput lable="Avatar" name="avatar" placeholder="" type="file" /> */}
            <FormInput lable="User name" name="username" placeholder="" type="" />
            <FormInput lable="Pass word" name="password" placeholder="" type="password" />
            <FormInput lable="Confirm" name="comfirmPassword" placeholder="" type="password" />
            <Button type="submit">Sign up</Button>
        </Form>
    );
}

export default SignUp;
