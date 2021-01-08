import {useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

import BlogDetail from './BlogDetail';
import LogIn from './LogIn';
import Homepage from './Homepage';
import Header from './Header';

function App() {
  const [posts, setPosts] = useState([]);
  const [postDetail, setPostDetail] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // var postList = <p></p>;

  function handleChange(event){
    let name = event.target.name;
    let value = event.target.value;
    if(name==='username')setUsername(value)
    if(name==='password')setPassword(value)
    if(name==='comment')setComment(value)
  }

  return (
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route exact path='/'>
          <Homepage
            setPosts = {setPosts}
            posts = {posts}
          />
        </Route>
        <Route path='/posts/:id'>
          <BlogDetail
            data={postDetail}
            comments={postComments}
            setPostDetail = {setPostDetail}
            setPostComments = {setPostComments}
            comment = {comment}
            setComment = {setComment}
            onChange={handleChange}
          />
        </Route>
        <Route to='/login'>
          <LogIn
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onChange={handleChange}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
