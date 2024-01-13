import AppLayout from '@/components/AppLayout';
import { useInput } from '@/hooks/input';
import { SIGN_UP_REQUEST } from '@/reducer/user';
import { Form, Input, Button, Checkbox } from 'antd'
import Password from 'antd/es/input/Password';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading } = useSelector((state)=> state.user);
  const [id, onChangeId] = useInput('');
  const [pwd, onChangePwd] = useInput('');
  const [name, onChangeName] = useInput('');
  const [intro, onChangeIntro] = useInput('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const onChangePwdConfirm = useCallback((e)=>{
    setPwdConfirm(e.target.value);
    setPwdError(false);
  },[]);
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const onChangeCheckbox = useCallback((e) => {
    setCheckbox(e.target.checked);
    setCheckboxError(false);
  },[]);
  const onSubmit = useCallback(() => {
    if(pwd !== pwdConfirm) {
      return setPwdError(true);
    }
    if(!checkbox) {
      return setCheckboxError(true);
    }
    console.log({id, pwd, name, intro});
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { id, pwd, name, intro }
    });
  },[id, pwd, name, intro, pwdConfirm, checkbox, dispatch]);
  return (
    <>
      <AppLayout>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="signup_email">이메일</label>
          <Input id="signup_email" type="email" value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="signup_password">비밀번호</label>
          <Input id="signup_password" type="password" value={pwd} onChange={onChangePwd}/>
        </div>
        <div>
          <label htmlFor="signup_password_confirm">비밀번호 확인</label>
          <Input id="signup_password_confirm" type="password" value={pwdConfirm} onChange={onChangePwdConfirm}/>
          {pwdError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다</div>}
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <Input id="nickname" value={name} onChange={onChangeName} />
        </div>
        <div>
          <label htmlFor='intro'>자기소개</label>
          <Input id='intro' value={intro} onChange={onChangeIntro} />
        </div>
        <div>
          <Checkbox checked={checkbox} onChange={onChangeCheckbox}>동의합니다</Checkbox>
          {checkboxError && <div style={{color:'red'}}>체크해야 회원가입됩니다</div>}
        </div>
        <div>
          <Button htmlType="submit" loading={signupLoading}>가입하기</Button>
        </div>
      </Form>
      </AppLayout>
    </>
  );
}

export default Signup;