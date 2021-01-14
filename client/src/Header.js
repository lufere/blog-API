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
            <Link className='logo' to='/'>Blog Viewer</Link>
            <nav>
                <a href='https://lufere.dev/blog-manager/'>Blog Manager</a>
                <p>Welcome <span>{JSON.parse(localStorage.getItem('currentUser')).username}</span></p>
                <button 
                    onClick={()=>{
                        localStorage.clear();
                        window.location.reload();
                        }} 
                    className='logout'
                >Logout</button>
            </nav>
        </header>
        )
    }else{
        return(
            <header>
                <Link to='/'>Blog Viewer</Link>
                <nav>
                    <a href='https://lufere.dev/blog-manager/'>Blog Manager</a>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign up</Link>
                </nav>
            </header>
        )
    }
}

export default Header