import React from 'react';
import { Link } from 'react-router-dom';
// import './BlogPreview.css';

const BlogPreview = props => {
    // console.log('preview: ',props.posts[0])
    function htmlDecode(input){
        var doc = new DOMParser().parseFromString(input, "text/html");
        // console.log('doc', doc.documentElement.textContent);
        return doc.documentElement.textContent;
    }

    return(
        <Link to={'/posts/' + props.postId}>
            <div className='blogPreview'>
                <div className='content'>
                    <h1>{props.title}</h1>
                    <p className='authorPreview'>Authored by <span>{props.author?props.author:'Anonymous'}</span> on <span>{props.timestamp}</span></p>
                    <p className='contentPreview' dangerouslySetInnerHTML={{__html: htmlDecode(props.content) }}></p>
                </div>
            </div>
        </Link>
    )
}

export default BlogPreview