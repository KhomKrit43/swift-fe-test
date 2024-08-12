import React from "react";
//eslint-disable-next-line
import { Card, List, Space } from 'antd';
import { useTranslation } from "react-i18next";
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();

  const handleClick = (link: string) => {
    window.location.href = link;
  };

  const testList = [
    {
      title: t('Title.test') + ' 1',
      description: t('Description.test1'),
      link: '/test1'
    },
    {
      title: t('Title.test') + ' 2',
      description: t('Description.test2'),
      link: '/test2'
    }
  ];

  return (
    <div className="Home">
      <h1>{t('Title.home')}</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={testList}
        className="List"
        renderItem={item => (
          <List.Item
            className="ListItem"
          >
            <Card onClick={() => handleClick(item.link)} title={item.title}>
              <Space className="Description">{item.description}</Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;
