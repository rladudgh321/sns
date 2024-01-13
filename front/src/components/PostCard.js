import { Avatar, Button, Card, Image, List, Popover } from "antd";
import { RetweetOutlined, HeartOutlined, MessageOutlined, HeartFilled, EllipsisOutlined } from '@ant-design/icons';
import { useState, useCallback } from "react";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";

const PostCard = ({post}) => {
  const { me } = useSelector((state) => state.user);
  const [like, setLike] = useState(false);
  const toggleLike = useCallback(()=>{
    setLike((prev) => !prev);
  },[]);
  const [message, setMessage] = useState(false);
  const onToggleMessage = useCallback(() => {
    setMessage((prev) => !prev);
  },[]);
  return (
    <>
      <Card
        title = {<div>{'시간'}</div>}
        extra = {<Button>팔로잉</Button>}
        cover={<Image src="https://kormedi.com/wp-content/uploads/2022/11/ck-cm270027748-l-700x467.jpg"></Image>}
        actions={[
          <RetweetOutlined key='retweet' />,
          
          like
            ? <HeartOutlined key='heart' onClick={toggleLike}/>
            : <HeartFilled key='unheart' onClick={toggleLike} />,
          
          <MessageOutlined key='message' onClick={onToggleMessage} />,
          <Popover key='more'  content={
            <Button.Group>
              {
                me
                ? <>
                    <Button>수정</Button>
                    <Button>삭제</Button>
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
        <CommentForm post={post} />
          <List
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