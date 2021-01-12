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
            <Link className='logo' to='/'>Blog API</Link>
            <nav>
                <p onClick={()=>localStorage.clear()}>Welcome {JSON.parse(localStorage.getItem('currentUser')).username}</p>
                <p 
                    onClick={()=>{
                        localStorage.clear();
                        window.location.reload();
                        }} 
                    className='logout'
                >Logout</p>
            </nav>
        </header>
        )
    }else{
        return(
            <header>
                <Link to='/'>Blog API</Link>
                <nav>
                    <a href='https://lufere.dev/blog-manager'>Blog Manager</a>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign up</Link>
                </nav>
            </header>
        )
    }
}

export default Header