import Button from '~/components/Button';
import Form from '~/components/Form';
import Input from '~/components/Input';
import Select from '~/components/FormSelect';
import request from '~/utils/httpRequest';

function SignUp() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const signUpData = Object.fromEntries(new FormData(e.target).entries());
        console.log(signUpData);
        // request
        //     .post('auth/signup', {
        //         lastName: 'afsadfas',
        //         firstName: 'baaaa',
        //         phone: '0851249052',
        //         sex: 'nu',
        //         username: 'nhietbaaaaaaa',
        //         avatar: 'fjsdalf;fsdafsvvvvvv',
        //         password: '1',
        //         comfirmPassword: '1',
        //     })
        //     .then((user) => console.log(user));
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Input name="lastName" placeholder="Enter last name..." />
            <Input name="firstName" placeholder="Enter first name..." />
            <Input name="phone" placeholder="Enter phone..." />
            <Select
                name="sex"
                options={[
                    { value: 0, optionName: '---sex---' },
                    { value: 'Nam', optionName: 'Nam' },
                    { value: 'Nữ', optionName: 'Nữ' },
                ]}
            />
            {/* <Input name="avatar" placeholder="Enter avatar..." type="file" /> */}
            <Input type="password" name="password" placeholder="Enter password..." />
            <Input type="password" name="confirmPassword" placeholder="Enter confirmPassword..." />
            <Button type="submit" login>
                Register
            </Button>
        </Form>
    );
}

export default SignUp;
