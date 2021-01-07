import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom"


const BlogDetail = props => {
    const {id} = useParams();

    useEffect(()=>{
        Promise.all([fetch('/posts/' + id),fetch('/posts/'+ id + '/comments')])
            .then(values=>{
                let test = values.map(x=>x.json())
                Promise.all(test)
                    .then(data=>{
                        props.setPostDetail(data[0].post);
                        props.setPostComments(data[1].comments);
                    })
            })
            return () =>{
                // console.log('unmounted');
                props.setPostDetail('');
                props.setPostComments(null);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(props.comments!=null){
        var commentList = props.comments.map(comment=><div key={comment._id} className='comment'>
            <p>By {comment.author?comment.author.username:'Anonymous'}</p>
            <p>{comment.content}</p>
            <p>{comment.timestamp}</p>
        </div>
        )
    }

    function onSubmit(event){
        event.preventDefault();
        fetch(`/posts/${id}/comments/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                "content":props.comment
            })
        })
            .then(response=>response.json())
            .then(data=>{
                fetch('/posts/'+ id + '/comments')
                    .then(response=>response.json())
                    .then(data=>{
                        props.setPostComments(data.comments);
                        props.setComment('');
                    })
                    .catch(err=>console.error(err));
            })
            .catch(err=>console.error(err));
    }

    return(
        <div>
            <Link to='/'>Back</Link>
            <h1>{props.data.title}</h1>
            <p>{props.data.author?props.data.author.username:null}</p>
            <p>{props.data.content}</p>
            <h2>Comments</h2>
            {commentList}
            <form>
                <label> Make a comment:
                    <textarea
                        name='comment'
                        value={props.comment}
                        onChange={props.onChange}
                    />
                    <button onClick={onSubmit} type='submit'>Submit</button>
                </label>
            </form>
        </div>
    )
}

export default BlogDetail