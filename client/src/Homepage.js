/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BlogPreview from "./BlogPreview"

const Homepage = props =>{
    useEffect(()=>{
      props.checkExpiration();
      fetch(`${process.env.REACT_APP_API}/posts`)
        .then(posts =>posts.json())
        .then(posts =>{
          // console.log(posts)
            setTimeout(() => {
              props.setPosts(posts.post_list);
            }, 1100);
        })
        .catch(err=>console.error(`Error: ${err}`));
        // console.log(localStorage.getItem('authToken'));
      //   console.log(localStorage.getItem('currentUser'));
        // localStorage.clear();
        // console.log('Check expiration');
    },[])

        var postList = props.posts.map((post,i)=>{
          if(post.published){
            return <BlogPreview
              key = {post.title+' - '+post.author}
              title = {post.title}
              author = {post.author?post.author.username:null}
              content = {post.content}
              postId = {post._id}
              timestamp = {post.timestamp_formatted}
              index = {i}
            />
          }else{
            return null
          }
        })
    if(props.posts.length===0){
      return(
        <div className='spinnerContainer'>  
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      )
    }else{
      return(
        <div className="homepage">
          {/* <h3>Welcome {localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')).username:null}</h3> */}
            {postList}
        </div>
      )
    }
}

export default Homepage