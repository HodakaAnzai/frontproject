import Comment from './comment/Comment';
import './UserDetail.css';

const id = ['22fi000'];
const address = ['@ms.dendai'];
let isBan = true;

const UserDetail = () => {
  return (
    <div className="userDetailArea">
      <h1 className="title">ユーザー詳細</h1>
      <UserdetailComponent />
      <h3 className="subtitle">過去のコメント</h3>
      <Comment />
    </div>
  )
}

const UserdetailComponent=()=>{
    return (
        <div className="detail">
          <h2>{id}</h2>
          <p>{address}</p>
         {isBan ? <button>BAN解除</button> : <button>BANする</button>}
        </div>
      )
};

export default UserDetail
