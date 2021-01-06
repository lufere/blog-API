import { useEffect, useState } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import './App.css';

import BlogPreview from './BlogPreview';
import BlogDetail from './BlogDetail';
import LogIn from './LogIn';

function App() {
  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState();
  const [postDetail, setPostDetail] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // var postList = <p></p>;

  function reset(){
    setPostDetail('');
  }

  function handleChange(event){
    let name = event.target.name;
    let value = event.target.value;
    if(name==='username')setUsername(value)
    if(name==='password')setPassword(value)
  }

  useEffect(()=>{
    fetch('/posts')
      .then(posts =>posts.json())
      .then(posts =>{
        // console.log(posts)
        setPosts(posts.post_list);
      })
      .catch(err=>console.error(`Error: ${err}`));
  },[])

  function onLoad(data){
    // console.log('data',data)
    setPostDetail(data[0].post);
    setPostComments(data[1].comments);
    // console.log(PostComments);
  }


  useEffect(() => {
    // console.log('These are the newests posts: ',posts)

    setPostList(
      posts.map(post=>{
        return <BlogPreview
          key = {post.title+' - '+post.author}
          title = {post.title}
          author = {post.author.username}
          content = {post.content}
          postId = {post._id}
        />
      })
    )
    // console.log(postList)
    // console.log(posts[0].title)
  }, [posts])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <div className="App">
            <Link to='/login'>LOGIN</Link>
            <header className="App-header">
              {postList}
            </header>
          </div>
        </Route>
        <Route path='/posts/:id'>
          <BlogDetail
            data={postDetail}
            comments={postComments}
            onLoad = {(data)=>onLoad(data)}
            setPostDetail = {setPostDetail}
            setPostComments = {setPostComments}
          />
        </Route>
        <Route to='/login'>
          <LogIn
            username={username}
            password={password}
            onChange={handleChange}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
