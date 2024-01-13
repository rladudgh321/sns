import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { useSelector } from "react-redux";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPost } = useSelector((state) => state.post);
  return (
    <>
      <AppLayout>
        {me && <PostForm />}
        {mainPost.map((v) => <PostCard key={v.id} post={v} /> )}
      </AppLayout>
    </>
  );
}

export default Home;