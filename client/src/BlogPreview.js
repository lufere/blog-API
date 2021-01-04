import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPreview.css';

const BlogPreview = props => {
    // console.log('preview: ',props.posts[0])
    return(
        <Link to={'/posts/' + props.postId}>
            <div className='blogPreview'>
                <h1>{props.title}</h1>
                <p>{props.author}</p>
                <p>{props.content}</p>
            </div>
        </Link>
    )
}

export default BlogPreview