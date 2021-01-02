import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState();
  // var postList = <p></p>;

  useEffect(()=>{
    fetch('/posts')
      .then(posts =>posts.json())
      .then(posts =>{
        // console.log(posts)
        setPosts(posts.post_list);
      })
  },[])


  useEffect(() => {
    console.log('These are the newests posts: ',posts)
    
    setPostList(
      posts.map(post=>{
        return <div className='blogPreview'>
          <h2>{post.title}</h2>
          <p>{post.author.username}</p>
          <p>{post.content}</p>
        </div>
      })
    )
    console.log(postList)
    // console.log(posts[0].title)
  }, [posts])

  return (
    <div className="App">
      <header className="App-header">
        {postList}
        {/* {testList}
        <p>
          Hello World
        </p> */}
      </header>
    </div>
  );
}

export default App;
