import { useEffect } from "react"
import { Link } from "react-router-dom"

const Header = props =>{

    useEffect(()=>{
        // console.log('updated');
        // props.checkExpiration();
    })

    if(localStorage.getItem('currentUser')){
        return(
        <header>
            <Link to='/'>Blog API</Link>
            <p onClick={()=>localStorage.clear()}>Welcome {JSON.parse(localStorage.getItem('currentUser')).username}</p>
        </header>
        )
    }else{
        return(
            <header>
                <Link to='/'>Blog API</Link>
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign up</Link>
                </div>
            </header>
        )
    }
}

export default Header