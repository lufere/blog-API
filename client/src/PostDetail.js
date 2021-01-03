import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"


const PostDetail = props => {
    const {id} = useParams();

    useEffect(()=>{
        fetch('/posts/' + id)
        .then(response=>response.json())
        .then(data=>{
            console.log('Post: ', data.post)
            props.onLoad(data.post)
        })
        .catch(err=>console.error(`Error: ${err}`));
    },[])

    return(
        <div>
            This is the post with ID: {id} 
            <p>{props.data.title}</p>
        </div>
    )
}

export default PostDetail