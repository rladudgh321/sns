import { useInput } from "@/hooks/input";
import { ADD_COMMENT_REQUEST } from "@/reducer/post";
import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

const CommentForm = ({post}) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [content, onChangeContent] = useInput('');
  const onSubmit = useCallback(() => {
    console.log({content});
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content, postId: post.id, userId: me.id }
    })
  },[content, dispatch, me.id, post.id]);
  return (
    <>
      <Form onFinish={onSubmit}>
        <Input.TextArea placeholder="댓글 입력해요" value={content} onChange={onChangeContent} />
        <Button htmlType="submit" style={{float:'right', zIndex:1}}>짹짹</Button>
      </Form>
    </>
  );
}

export default CommentForm;