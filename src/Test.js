import Button from '~/components/Button';
import Form from '~/components/Form';
import Input from '~/components/Input';
import Select from '~/components/FormSelect';
import request from '~/utils/httpRequest';
import { useState } from 'react';

function Test() {
    const [file, setFile] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('console: ', file);
        const formData = new FormData();
        formData.append('file', file);

        console.log('formData: ', formData);

        request
            .post('/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                console.log(response.data);
            });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <input
                name="image"
                placeholder="Choose avatar..."
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Button type="submit" login>
                Test
            </Button>
        </Form>
    );
}

export default Test;
