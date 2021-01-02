import { useEffect, useState } from 'react';
import './App.css';

import BlogPreview from './blogPreview';

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
        return <BlogPreview
          title = {post.title}
          author = {post.author.username}
          content = {post.content}
        />
      })
    )
    console.log(postList)
    // console.log(posts[0].title)
  }, [posts])

  return (
    <div className="App">
      <header className="App-header">
        {postList}
      </header>
    </div>
  );
}

export default App;
