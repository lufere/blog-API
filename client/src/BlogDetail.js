import React, { useEffect } from 'react';
import { useParams, Link, useHistory } from "react-router-dom"
import './spinner.css'

const BlogDetail = props => {
    const {id} = useParams();
    const history = useHistory();

    useEffect(()=>{
        // console.log('OVERFLOWN?',isOverflown());
        props.checkExpiration();
        Promise.all([fetch(`${process.env.REACT_APP_API}/posts/` + id),fetch(`${process.env.REACT_APP_API}/posts/${id}/comments`)])
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
        console.log('this',props.comments[0])
        var commentList = props.comments.map(comment=><div key={comment._id} className='comment'>
            <p>{comment.author?comment.author.username:'Anonymous'} said: </p>
            <p dangerouslySetInnerHTML={{__html: htmlDecode(comment.content) }}></p>
            <p>On {comment.timestamp_formatted}</p>
        </div>
        )
    }

    function onSubmit(event){
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API}/posts/${id}/comments/`,{
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
                fetch(`${process.env.REACT_APP_API}/posts/${id}/comments`)
                    .then(response=>response.json())
                    .then(data=>{
                        props.setPostComments(data.comments);
                        props.setComment('');
                    })
                    .catch(err=>console.error(err));
            })
            .catch(err=>console.error(err));
    }

    function htmlDecode(input){
        var doc = new DOMParser().parseFromString(input, "text/html");
        // console.log('doc', doc.documentElement.textContent);
        return doc.documentElement.textContent;
    }

    if(!props.data){
        return(
            <div className="spinnerContainer">
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
            <div className='blogDetailContainer'>
                <div className='blogDetail'>
                    <button
                        className='return'
                        onClick={()=>history.push('/')}
                    />
                    <h1>{props.data.title}</h1>
                    <p className='detailAuthor'>By {props.data.author?props.data.author.username:null}</p>
                    <p className='detailContent' dangerouslySetInnerHTML={{__html: htmlDecode(props.data.content) }}></p>
                    <p className='detailPublished'>Published on: {props.data.timestamp_formatted}</p>
                    {/* <div className='spinner'></div> */}
                    <div className='commentContainer'>
                        <h2>Comments</h2>
                        {commentList}
                    </div>
                    {localStorage.getItem('currentUser')?
                        <form className='postComment'>
                            <label> Make a comment:
                                <textarea
                                    name='comment'
                                    value={props.comment}
                                    onChange={props.onChange}
                                />
                            </label>
                            <button onClick={onSubmit} type='submit'>Submit</button>
                        </form>
                        :<p className='userRequired'>
                            You need to be a user to leave comments. 
                            <Link to='/login'> Log in </Link>
                            or 
                            <Link to='/signup'> Sign up </Link>
                        </p>
                    }

                </div>
            </div>
        )
    }

}

export default BlogDetail