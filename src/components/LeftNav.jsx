import React from 'react'
import { Link } from 'react-router-dom'

function LeftNav() {
  return (
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><Link to='/'>라이톤 홈</Link></li>
            <li class="list-group-item"><Link to='/challenge'>글 챌린지</Link></li>
            <li class="list-group-item"><Link to='/template'>글 템플릿</Link></li>
            <li class="list-group-item"><Link to='/record'>글 기록</Link></li>
            <li class="list-group-item"><Link to='/mypage'>마이페이지</Link></li>
        </ul>
    </div>
  )
}

export default LeftNav