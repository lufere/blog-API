import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import './spinner.css'

const BlogDetail = props => {
    const {id} = useParams();

    useEffect(()=>{
        props.checkExpiration();
        Promise.all([fetch('/posts/' + id),fetch('/posts/'+ id + '/comments')])
            .then(values=>{
                let test = values.map(x=>x.json())
                Promise.all(test)
                    .then(data=>{
                        setTimeout(() => {
                            props.setPostDetail(data[0].post);
                            props.setPostComments(data[1].comments);
                        }, 1100);

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
    if(!props.data){
        return(
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        )
    }else{
        return(
            <div>
                <Link to='/'>Back</Link>
    
                <h1>{props.data.title}</h1>
                <p>{props.data.author?props.data.author.username:null}</p>
                <p>{props.data.content}</p>
                <h2>Comments</h2>
                {/* <div className='spinner'></div> */}
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

}

export default BlogDetail