import React from 'react';

import './style.css';

function DevItem({ dev }) { // { dev } é uma desestruturação da props
  return (
    <li className="devItem">
      <header>
        <img src={dev.avatarURL} alt={dev.name} />
        
        <div className="userInfo">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
        </div>
      </header>

      <p>{dev.bio}</p>

      <a href={`https://github.com/${dev.githubUserName}`}>Acessar perfil no Github</a>
    </li>
  )
}
export default DevItem;