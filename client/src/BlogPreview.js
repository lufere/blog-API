import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './BlogPreview.css';

const BlogPreview = props => {
    // const [overFlown, setOverFlown] = useState(false)

    // useEffect(()=>{
    //     console.log(overFlown)
    //   },[overFlown])
    // useEffect(()=>{
    //     let content;
    //     let preview =  document.querySelectorAll('.blogPreview')[1];
    //     if(preview ){
    //         content = preview.querySelector('.content');
    //         console.log(content.scrollHeight);
    //         console.log(content.offsetHeight);
    //         if(content.scrollHeight > content.offsetHeight) setOverFlown(true)
    //         setOverFlown(false);
    //     }
    // },[])
    // var footer = overFlown?<div className='readMore'>READ MORE</div>:'asdsd';
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
                {/* {footer} */}
                {/* {overFlown?<div className='readMore'>READ MORE</div>:null} */}
            </div>
        </Link>
    )
}

export default BlogPreview