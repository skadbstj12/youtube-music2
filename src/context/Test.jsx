import React, { createContext, useEffect, useState } from 'react'

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/yoon_list.json`);
                const data = await response.json();
                setMusicData(data);
                console.log(data)
            } catch (error) {
                console.error('데이터를 가져오는데 실패했습니다.', error);
            }
        };
        fetchData();
    }, []);

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        if (isShuffling) {
            setCurrentTrackIndex(Math.floor(Math.random() * musicData.length));
        } else {
            setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicData.length);
        }
        setIsPlaying(true);
        setPlayed(0);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
        setIsPlaying(true);
        setPlayed(0);
    };

    const updatePlayed = (played) => {
        setPlayed(played);
    };

    const updateDuration = (duration) => {
        setDuration(duration);
    };

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleRepeat = () => {
        setIsRepeating(!isRepeating);
    };

    const handleTrackEnd = () => {
        if (isRepeating) {
            setPlayed(0);
            setCurrentTrackIndex(currentTrackIndex);  // 현재 트랙 인덱스를 명시적으로 다시 설정
            setIsPlaying(true);
        } else {
            nextTrack();
        }
    };

    // 재생 목록에 트랙을 추가하는 함수
    const addTrackToList = (track) => {
        setMusicData((prevMusicData) => [track, ...prevMusicData]);
    };

    // 재생 목록의 끝에 트랙을 추가하는 함수
    const addTrackToEnd = (track) => {
        setMusicData((prevMusicData) => [...prevMusicData, track]);
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                musicData,
                currentTrackIndex,
                isPlaying,
                played,
                duration,
                isShuffling,
                isRepeating,
                playTrack,
                pauseTrack,
                prevTrack,
                nextTrack,
                updatePlayed,
                updateDuration,
                toggleShuffle,
                toggleRepeat,
                handleTrackEnd,
                addTrackToList,
                addTrackToEnd
            }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}

export default MusicPlayerProvider