import { useState } from 'react';
import request from '~/utils/httpRequest';

function Home() {
    const [user, setUser] = useState();

    request.get('auth/curent-username').then((user) => console.log(user));

    if (user != null) {
        return <h1>Hello {user}</h1>;
    }

    return <h1>Home page</h1>;
}

export default Home;
