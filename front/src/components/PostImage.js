import { Image } from "antd";

const PostImage = ({post}) => {
  return (
    <>
      <Image.PreviewGroup
        items={post.Images.map((v) => v.src)}
      >
        <Image
          width='auto'
          src={post.Images[0].src} alt={post.Images[0].src}
        />
      </Image.PreviewGroup>
    </>
  );
}

export default PostImage;