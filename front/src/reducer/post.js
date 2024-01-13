const initialState = {
  mainPost: [{
    id:1,
    User: {
      id:1,
      nickname: 'kkk',
    },
    content: '첫번째 게시글',
    Images: [{src: 'https://kormedi.com/wp-content/uploads/2022/11/ck-cm270027748-l-700x467.jpg'}, {
    src:'https://health.chosun.com/site/data/img_dir/2023/07/14/2023071401917_0.jpg'}, {
      src:'https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/02/%ED%91%B8%EB%93%9C%ED%8F%AC%EC%BB%A4%EC%8A%A42%ED%8E%B807.jpg'}],
    Comments: [{
      id:1,
      User:{
        id:1,
        nickname:'kkk'
      },
      content:'첫댓글111'
    }, {
      id:2,
      User: {
        id:1,
        nickname:'kkk',
      },
      content: '두번째댓글222',
    }]
  }],
  addpostLoading: false,
  addpostDone: false,
  addpostError: null,
  removepostLoading: false,
  removepostDone: false,
  removepostError: null,
  addcommentLoading: false,
  addcommentDone: false,
  addcommentError: null,
}

export const ADD_POST_REQUEST='ADD_POST_REQUEST';
export const ADD_POST_SUCCESS='ADD_POST_SUCCESS';
export const ADD_POST_FAILURE='ADD_POST_FAILURE';
export const REMOVE_POST_REQUEST='REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS='REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE='REMOVE_POST_FAILURE';
export const ADD_COMMENT_REQUEST='ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS='ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE='ADD_COMMENT_FAILURE';


const dummyPost = (data) => ({
  id:2,
  User: {
    id:1,
    nickname: 'kkk',
  },
  content: data,
  Images: [{src: 'https://kormedi.com/wp-content/uploads/2022/11/ck-cm270027748-l-700x467.jpg'}, {
    src:'https://health.chosun.com/site/data/img_dir/2023/07/14/2023071401917_0.jpg'}, {
      src:'https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/02/%ED%91%B8%EB%93%9C%ED%8F%AC%EC%BB%A4%EC%8A%A42%ED%8E%B807.jpg'}],
  Comments: [{
    id:3,
    User:{
      id:1,
      nickname:'kkk'
    },
    content:'첫댓글111'
  }, {
    id:4,
    User: {
      id:1,
      nickname:'kkk',
    },
    content: '두번째댓글222',
  }],
});

const dummyComment = (data) => ({
  id: 3,
  User: {
    id:data.userId,
    nickname: 'kkk'
  },
  content: data.content
});

const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addpostLoading: true,
        addpostDone: false,
        addpostError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPost: [dummyPost(action.data.content), ...state.mainPost],
        addpostLoading: false,
        addpostDone: true,
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        addpostLoading: false,
        addpostError: action.error,
      }
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removepostLoading: true,
        removepostDone: false,
        removepostError: null,
      }
    case REMOVE_POST_SUCCESS:{
      const mainPost = state.mainPost.filter((v) => v.id !== action.data);
      return {
        ...state,
        mainPost,
        removepostLoading: false,
        removepostDone: true,
      }
    }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removepostLoading: false,
        removepostError: action.error,
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addcommentLoading: true,
        addcommentDone: false,
        addcommentError: null,
      }
    case ADD_COMMENT_SUCCESS:
      const index = state.mainPost.findIndex((v) => v.id === action.data.postId);
      const post = state.mainPost[index];
      post.Comments = [dummyComment(action.data), ...post.Comments];
      const mainPost = [...state.mainPost];
      mainPost[index] = post;
      return {
        ...state,
        mainPost,
        addcommentLoading: false,
        addcommentDone: true,
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addcommentLoading: false,
        addcommentError: action.error,
      }
    default:
      return state;
  }
}

export default postReducer;