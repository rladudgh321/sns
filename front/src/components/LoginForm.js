import { useInput } from "@/hooks/input";
import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { LOG_IN_REQUEST } from "@/reducer/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state)=> state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(() => {
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  },[email, password, dispatch])
  return (
    <>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="loginForm_email">이메일</label>
          <Input id="loginForm_email" type="email" value={email} onChange={onChangeEmail} />
        </div>
        <div>
          <label id="loginForm_password">비밀번호</label>
          <Input id="loginForm_password" type="password" value={password} onChange={onChangePassword}/>
        </div>
        <div>
          <Button htmlType="submit" loading={loginLoading}>로그인</Button>
          <Button type="primary" style={{float:'right'}}><Link href='/signup'>회원가입</Link></Button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;