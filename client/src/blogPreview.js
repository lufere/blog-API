import React from 'react';

const BlogPreview = props => {
    // console.log('preview: ',props.posts[0])
    return(
        <div className='blogPreview'>
            <h1>{props.title}</h1>
            <p>{props.author}</p>
            <p>{props.content}</p>
            {/* <p>{props.post?props.posts[0].title:null}</p> */}
        </div>
    )
}

export default BlogPreview