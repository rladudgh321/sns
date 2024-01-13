const initialState = {
  mainPost: [{
    id:1,
    User: {
      id:1,
      nickname: 'kkk',
    },
    content: '첫번째 게시글',
    Images: [{src: '111'}, {src:'222'}, {src:'333'}],
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
  addcommentLoading: false,
  addcommentDone: false,
  addcommentError: null,
}

export const ADD_POST_REQUEST='ADD_POST_REQUEST';
export const ADD_POST_SUCCESS='ADD_POST_SUCCESS';
export const ADD_POST_FAILURE='ADD_POST_FAILURE';
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
  Images: [{src: '111'}, {src:'222'}, {src:'333'}],
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