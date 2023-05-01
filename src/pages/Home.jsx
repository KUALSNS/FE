import React from 'react'
import LeftNav from '../components/LeftNav'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <LeftNav/>
        <Link to='/login'>Sign in</Link>
        <Link to='/register'>Sign up</Link>
    </div>
  )
}

export default Home