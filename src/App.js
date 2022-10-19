import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import { publicRoutes } from './routes';
import React from 'react';
import DashboardPage from './pages/Dashboard/DashboardPage';
import SignIn from './pages/SignIn';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                <Route
                    path="/admin"
                    element={
                        <DashboardPage>
                            <SignIn></SignIn>
                        </DashboardPage>
                    }
                ></Route>
                <Route
                    path="ssign-in"
                    element={
                        <DashboardPage>
                            <SignIn></SignIn>
                        </DashboardPage>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
