import { useInput } from "@/hooks/input";
import { ADD_POST_REQUEST } from "@/reducer/post";
import { Button, Form, Input } from "antd";
import { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const PostForm = () => {
  const dispatch = useDispatch();
  const { addpostLoading } = useSelector((state) => state.post);
  const onRef = useRef();
  const onImage = useCallback(() => {
    onRef.current.click();
  },[]);
  const [content, onChangeContent] = useInput('');
  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: { content }
    });
  },[content, dispatch]);
  return (
    <Form onFinish={onSubmit}>
      <Input.TextArea placeholder="글과 이미지를 올려보세요" value={content} onChange={onChangeContent} />
      <input type="file" style={{display:'none'}} ref={onRef} />
      <Button onClick={onImage}>사진 업로드</Button>
      <Button style={{float:'right'}} type="primary" htmlType="submit" loading={addpostLoading}>짹짹</Button>
    </Form>
  );
}

export default PostForm;