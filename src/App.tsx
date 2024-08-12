// App.tsx
import React, { Suspense, lazy } from "react";
import { Button, Layout, Dropdown, Typography, Space } from "antd";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import "./i18n";
import "./App.scss";
import Loading from './components/Loading';

// components
const Home = lazy(() => import('./components/Home'));
const Test1 = lazy(() => import('./components/Test1'));
const Test2 = lazy(() => import('./components/Test2'));

const { Header, Content } = Layout;

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items: MenuProps['items'] = [
    {
      key: 'th',
      label: t("th"),
      onClick: () => changeLanguage("th")
    },
    {
      key: 'en',
      label: t("en"),
      onClick: () => changeLanguage("en")
    },
  ];

  const currentPath = window.location.pathname;

  const headerTitle = () => {
    switch (currentPath) {
      case '/':
        return ''
      case '/test1':
        return t('Description.test1');
      case '/test2':
        return t('FormAndTable');
      default:
        return ''
    }
  }

  return (
    <div className="App">
        <Header className="AppHeader">
          <div className="HeaderTitle">
            <LeftOutlined
              style={{ visibility: currentPath === '/' ? 'hidden' : 'visible' }}
              onClick={() => window.history.back()}
              className="GotoBack"
            />
            <Typography.Title level={3} className="AppTitle">{headerTitle()}</Typography.Title>
          </div>
          <Dropdown menu={{
            items,
            selectable: true,
            defaultSelectedKeys: [i18n.language]
          }}>
            <Typography.Link onClick={e => e.preventDefault()}>
              <Button className="BtnLang">
                <Space>
                  <Typography.Text>{t(i18n.language)}</Typography.Text>
                </Space>
                <DownOutlined />
              </Button>
            </Typography.Link>
          </Dropdown>
        </Header>
        <Content className="AppContent">
          <Suspense fallback={<Loading />}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test1" element={<Test1 />} />
                <Route path="/test2" element={<Test2 />} />
              </Routes>
            </Router>
          </Suspense>
        </Content>
    </div>
  );
}

export default App;
