import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom"


const BlogDetail = props => {
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
            <Link to='/'>Back</Link>
            <h1>{props.data.title}</h1>
            <p>{props.data.author?props.data.author.username:null}</p>
            <p>{props.data.content}</p>
        </div>
    )
}

export default BlogDetail