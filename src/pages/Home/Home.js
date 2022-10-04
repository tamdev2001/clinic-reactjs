import { useState } from 'react';
import request from '~/utils/httpRequest';

function Home() {
    const [user, setUser] = useState();

    if (user != null) {
        return <h1>Hello {user}</h1>;
    }

    return <h1>Home page</h1>;
}

export default Home;
