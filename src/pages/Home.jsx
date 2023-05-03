import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to='/login'>Sign in</Link>
        <Link to='/register'>Sign up</Link>
    </div>
  )
}

export default Home