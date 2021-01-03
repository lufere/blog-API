import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"


const PostDetail = props => {
    const {id} = useParams();

    return(
        <div>
            This is the post with ID: {id} 
        </div>
    )
}

export default PostDetail