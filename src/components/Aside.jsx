import React, { useContext, useRef, useState, useEffect } from 'react';
import { IoMusicalNotes, IoPlaySkipForward, IoPlaySkipBack, IoPlay, IoPause, IoRepeat, IoShuffleOutline } from 'react-icons/io5';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import ReactPlayer from 'react-player';

const Aside = () => {
    const { musicData } = useContext(MusicPlayerContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);
    const currentTrackRef = useRef(null);

    const currentTrack = musicData.length > 0 ? musicData[currentIndex] : null;

    useEffect(() => {
        if (currentTrackRef.current) {
            currentTrackRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentIndex]);

    const playTrack = (index) => {
        setCurrentIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleSeekChange = (e) => {
        const newPlayed = parseFloat(e.target.value);
        setPlayed(newPlayed);
        playerRef.current.seekTo(newPlayed);
    };

    const handleProgress = (state) => {
        setPlayed(state.played);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % musicData.length);
        setPlayed(0);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
        setPlayed(0);
    };

    const formatTime = (seconds) => {
        if (!seconds) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <aside id='aside'>
            <div className='play-now'>
                <h2><IoMusicalNotes /> Now Playing</h2>
                <div className='thumb'>
                    <div className='img'>
                        {currentTrack && (
                            <ReactPlayer
                                ref={playerRef}
                                url={`https://www.youtube.com/watch?v=${currentTrack.videoID}`}
                                playing={isPlaying}
                                controls={false}
                                width="100%"
                                height="100%"
                                onDuration={handleDuration}
                                onProgress={handleProgress}
                            />
                        )}
                    </div>
                    <span className='title'>{currentTrack?.title || '선택된 노래가 없습니다.'}</span>
                    <span className='artist'>{currentTrack?.artist || '😝 노래 클릭'}</span>
                </div>
                <div className='progress'>
                    <div className='progress-bar'>
                        <input
                            type='range'
                            min='0'
                            max='1'
                            step='0.01'
                            value={played}
                            onChange={handleSeekChange}
                            style={{ backgroundSize: `${played * 100}% 100%` }}
                        />
                    </div>
                    <div className='times'>
                        <span className='current'>{formatTime(played * duration)}</span>
                        <span className='total'>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className='controls'>
                    <span className='shuffle'><IoShuffleOutline /></span>
                    <span className='prev' onClick={handlePrev}><IoPlaySkipBack /></span>
                    {isPlaying ? (
                        <span className='play bg' onClick={pauseTrack}><IoPause /></span>
                    ) : (
                        <span className='play bg' onClick={() => setIsPlaying(true)}><IoPlay /></span>
                    )}
                    <span className='next' onClick={handleNext}><IoPlaySkipForward /></span>
                    <span className='repeat'><IoRepeat /></span>
                </div>
                <div className='volume'>
                    <input type='range' min='0' max='100' step='1' />
                </div>
            </div>

            <div className='play-list'>
                <h3><IoMusicalNotes /> Play list</h3>
                <ul className='scrollable-list'>
                    {musicData.map((track, index) => (
                        <li
                            key={index}
                            onClick={() => playTrack(index)}
                            className={index === currentIndex ? 'current-track' : ''}
                            ref={index === currentIndex ? currentTrackRef : null}
                        >
                            <span className='img' style={{ backgroundImage: `url(${track.imageURL})` }}></span>
                            <span className='title'>
                                {track.title}

                                <span>{index === currentIndex && isPlaying && <IoPause onClick={pauseTrack} className='play-icon' />}
                                    {index === currentIndex && !isPlaying && <IoPlay onClick={() => setIsPlaying(true)} className='play-icon' />}</span>
                            </span>

                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    );
};

export default Aside;
