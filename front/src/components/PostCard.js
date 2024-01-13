import { Avatar, Button, Card, Image, List, Popover } from "antd";
import { RetweetOutlined, HeartOutlined, MessageOutlined, HeartFilled, EllipsisOutlined } from '@ant-design/icons';
import { useState, useCallback } from "react";
import CommentForm from "./CommentForm";
import { useSelector,useDispatch } from "react-redux";
import { REMOVE_POST_REQUEST } from "@/reducer/post";
import PostImage from "./PostImage";

const PostCard = ({post}) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [like, setLike] = useState(false);
  const toggleLike = useCallback(()=>{
    setLike((prev) => !prev);
  },[]);
  const [message, setMessage] = useState(false);
  const onToggleMessage = useCallback(() => {
    setMessage((prev) => !prev);
  },[]);
  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    })
  },[dispatch, post.id]);
  return (
    <>
      <Card
        title = {<div>{'시간'}</div>}
        extra = {<Button>팔로잉</Button>}
        cover={ <PostImage post={post} /> }
        actions={[
          <RetweetOutlined key='retweet' />,
          
          like
            ? <HeartFilled key='unheart' onClick={toggleLike} />
            : <HeartOutlined key='heart' onClick={toggleLike}/>,
          
          <MessageOutlined key='message' onClick={onToggleMessage} />,
          <Popover key='more'  content={
            <Button.Group>
              {
                me
                ? <>
                    <Button>수정</Button>
                    <Button onClick={onRemovePost}>삭제</Button>
                  </>
                :<Button>신고</Button>
              }
            </Button.Group>
          }>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar>{post.User.nickname[1]}</Avatar>} 
          title= {post.User.nickname}
          description={post.content}
        />
      </Card>
      {
        message && <>
        {me && <CommentForm post={post} />}
          <List
            style={{ margin: '40px 0 20px 0' }}
            bordered
            header= { `${post.Comments.length}개 댓글이 있습니다` }
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{item.User.nickname[1]}</Avatar>}
                  title={item.User.nickname}
                  description={item.content}
                />
              </List.Item>
             )}
          >
          </List>
        </>

      }
    </>
  );
}

export default PostCard;