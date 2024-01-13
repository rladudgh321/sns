import { LOG_OUT_REQUEST } from "@/reducer/user";
import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { logoutLoading } = useSelector((state) => state.user);
  const onSubmit = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  },[dispatch]);
  return (
    <>
      <Card
        actions={[
          <div key='twits'>짹짹<br />0</div>,
          <div key='followings'>팔로잉<br/ >0</div>,
          <div key='followers'>팔로워<br/ >0</div>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar>d</Avatar>}
          title={'kkk'}
          description={'kkk is description'}
        />
        <Button style={{float:'right'}} onClick={onSubmit} loading={logoutLoading}>로그아웃</Button>
        
      </Card>
    </>
  );
}

export default UserProfile;