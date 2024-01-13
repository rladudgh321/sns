import { Col, Input, Menu, Row } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const AppLayout = ({children}) => {
  const { me } = useSelector((state) => state.user);
  const items = [{
    label: <div><Link href='/'>메인 페이지</Link></div>,
    key: 'main',
  }, {
    label: <div><Link href='/profile'>프로필</Link></div>,
    key: 'profile',
  }, {
    label: <Input.Search enterButton/>,
    key: 'search',
  }];
  return (
    <>
      <Menu items={items} mode='horizontal' />
      <Row>
        <Col xs={24} md={6}>
          {
            me
            ? <UserProfile />
            : <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link href='/'>메인페이지</Link>
        </Col>
      </Row>
    </>
  );
}

export default AppLayout;