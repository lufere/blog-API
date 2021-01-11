import {useState } from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import './App.css';

import BlogDetail from './BlogDetail';
import LogIn from './LogIn';
import Homepage from './Homepage';
import Header from './Header';
import Signup from './Signup'

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

  function checkExpiration(){
    if(localStorage.getItem('authToken')){
      var isExpired = false;
      const token = localStorage.getItem('authToken');
      var decodedToken = jwt.decode(token, {complete:true});
      var dateNow = new Date();
      if(decodedToken.payload.exp < dateNow.getTime()/1000) isExpired = true;
      if(isExpired) localStorage.clear();
      // console.log(decodedToken.payload.exp);
      // console.log(dateNow.getTime()/1000);
      // console.log(isExpired);
    }
  }

  return (
    <HashRouter>
      <Header
        checkExpiration = {checkExpiration}
      />
      <Switch>
        <Route exact path='/'>
          <Homepage
            setPosts = {setPosts}
            posts = {posts}
            checkExpiration = {checkExpiration}
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
          checkExpiration = {checkExpiration}
          />
        </Route>
        <Route path='/login'>
          <LogIn
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onChange={handleChange}
          />
        </Route>
        <Route path='/signup'>
          <Signup
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onChange={handleChange}
          />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
