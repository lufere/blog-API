import React from 'react';
import { Link } from 'react-router-dom';
// import './BlogPreview.css';

const BlogPreview = props => {
    // console.log('preview: ',props.posts[0])
    return(
        <Link to={'/posts/' + props.postId}>
            <div className='blogPreview'>
                <div className='content'>
                    <h1>{props.title}</h1>
                    <p className='authorPreview'>Authored by <span>{props.author?props.author:'Anonymous'}</span> on <span>{props.timestamp}</span></p>
                    <p>{props.content}</p>
                </div>
            </div>
        </Link>
    )
}

export default BlogPreview