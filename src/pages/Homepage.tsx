// src/layouts/Default.tsx
import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { albumRoute, userRoute } from '../routes/routes.contants';
import logo from '../logo.svg';

const { Header, Sider, Footer } = Layout;

const menuItems = [
    { key: albumRoute, label: 'Albums' },
    { key: userRoute, label: 'Users' },
];

const Homepage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', background: 'white' }}>
                <img src={logo} alt="Logo" style={{ height: '50px' }} />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={(e) => navigate(e.key)}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                    />
                </Sider>
                <Layout style={{ display: 'flex', flexDirection: 'column' }}>
                    <div >
                        {children}
                    </div>
                    <Footer style={{ textAlign: 'center' }}>
                        Created by ntnthao15102002@gmail.com
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Homepage;
