import wrapper from "@/store/createStore";

const App = ({Component}) => {
  return (
    <>
      <Component />
    </>
  );
}

export default wrapper.withRedux(App);