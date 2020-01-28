import React, { useState, useEffect } from 'react';

import './style.css';

function DevForm({ onSubmit }) {
  const [githubUserName, setGithubUserName] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
       (position) => {
          const{ latitude, longitude } = position.coords;
          
          setLatitude(latitude);
          setLongitude(longitude);
       },

       (err) => {
          console.log(err);
       },
       
       {
          timeout: 30000 
       }
    );
  }, []); // quando [] carrega somente uma vez

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      githubUserName,
      techs,
      latitude,
      longitude,
    });

    setGithubUserName('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputBlock">
        <label htmlFor="githubUserName">Usuário do Github</label>
        <input 
          name="githubUserName" 
          id="githubUserName" 
          required 
          value={githubUserName}
          onChange={e => setGithubUserName(e.target.value)}
        />
      </div>

      <div className="inputBlock">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          name="techs" 
          id="techs" 
          required 
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="inputGroup">
        <div className="inputBlock">
          <label htmlFor="latitude">Latitude</label>
          <input 
            name="latitude" 
            id="latitude" 
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="inputBlock">
          <label htmlFor="longitude">Longitude</label>
          <input 
            name="longitude" 
            id="longitude" 
            required 
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
  </form>
  );
}

export default DevForm;