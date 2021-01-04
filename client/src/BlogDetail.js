import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom"


const BlogDetail = props => {
    const {id} = useParams();

    useEffect(()=>{
        Promise.all([fetch('/posts/' + id),fetch('/posts/'+ id + '/comments')])
            .then(values=>{
                let test = values.map(x=>x.json())
                Promise.all(test)
                    .then(data=>props.onLoad(data))
                    
            })
        // fetch('/posts/' + id)
        // .then(response=>response.json())
        // .then(data=>{
        //     console.log('Post: ', data.post)
        //     props.onLoad(data.post)
        // })
        // .catch(err=>console.error(`Error: ${err}`));
    },[])

    if(props.comments!=null){
        var commentList = props.comments.map(comment=><div className='comment'>
            <p>By {comment.author?comment.author.username:'Anonymous'}</p>
            <p>{comment.content}</p>
            <p>{comment.timestamp}</p>
        </div>
        )
    }

    return(
        <div>
            <Link to='/'>Back</Link>
            <h1>{props.data.title}</h1>
            <p>{props.data.author?props.data.author.username:null}</p>
            <p>{props.data.content}</p>
            <h2>Comments</h2>
            {commentList}
        </div>
    )
}

export default BlogDetail