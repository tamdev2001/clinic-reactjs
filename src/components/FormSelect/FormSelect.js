import { Form } from 'react-bootstrap';

function Select({ lable, options = [{ value: '', name: '' }] }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Disabled select menu</Form.Label>
            <Form.Select id="disabledSelect" name="sex">
                {options.map((o) => (
                    <option value={o.name}>{o.name}</option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}

export default Select;
