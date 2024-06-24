import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayChart from '../components/PlayChart';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({ name: '', items: [] });

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem(id)) || { name: '', items: [] };
    setPlaylist(storedPlaylist);
  }, [id]);

  return (
    <section id="playlist">
      {playlist.items.length > 0 ? (
        <PlayChart
          title={`${playlist.name} 리스트`}
          data={playlist.items}
          showCalendar={false}
        />
      ) : (
        <section className='music-chart'>
          <div className="title">
            <h2>😜 {`${playlist.name}`}</h2>
          </div>
          <div className="list">
            <ul>
              <li>!!아직 리스트가 없습니다. 노래를 추가해주세요!</li>
            </ul>
          </div>
        </section>
      )}
    </section>
  );
}

export default Playlist;