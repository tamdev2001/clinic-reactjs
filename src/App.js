import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import { publicRoutes } from './routes';
import React from 'react';
import DashboardPage from './pages/Dashboard/DashboardPage';
import SignIn from './pages/SignIn';
import DashboardContent from './pages/UserManagement';
import DashboardMedicine from './pages/ManagementPages/MedicinePage';
import { sidebarLinks } from './layouts/components/Dashboard/DashboardSidebar';

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
                {sidebarLinks.map((item, idx) => {
                    return (
                        <Route
                            key={idx}
                            path={item.url}
                            element={<DashboardPage>{item.content(item.title)}</DashboardPage>}
                        ></Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
