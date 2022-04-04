import { useState, useEffect } from 'react'
import { audioClips } from './audioClips'
import Pad from './Pad'
import './App.css'

export function App() {
    const [volume, setVolume] = useState(1)
    const [recording, setRecording] = useState('')
    const [speed, setSpeed] = useState(0.5)
    let recordArray = recording.split(' ')

useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {document.removeEventListener('keydown', handleKeyPress)}})

const handleKeyPress = (e) => {
    if (e.key === 'Enter') playRecording()
    if (e.key === 'Delete') {
    setRecording('')
    recordArray = []
    }}

const playRecording = () => {
    let index = 0
    const interval = setInterval(() => {
    const audioTag = document.getElementById(recordArray[index])
    audioTag.volume = volume
    audioTag.currentTime = 0
    audioTag.play()
    index += 1
    }, speed * 600)

setTimeout(() => clearInterval(interval),
    600 * speed * recordArray.length - 1,)}

return (<div>
            <div className="title"><h2> DRUM PAD MACHINE </h2></div>
    <div className='container'>
            <div className="wrapper">    
            {audioClips.map((clip) => (
            <Pad
                key={clip.id}
                clip={clip}
                volume={volume}
                setRecording={setRecording}
            />
            ))}
            </div>  
            
            
    <div className="wrapper2">
        <div className="volume">
        <h4> VOLUME </h4>
        <input
            type="range"
            className="input-range"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            max="1"
            min="0"
        />
          </div>          
        <h3 className={`${recording && 'recording'}`}>{recording}</h3>
        {recording && (
    <div className='buttons'>
        <button type="button" onClick={playRecording} className="play">
            PLAY
        </button>

        <button
            type="button"
            onClick={() => {
            setRecording('')
            recordArray = []
        }}
            className="clear"
        >
            CLEAR
        </button>
        <div className="speed">
        <h4> SPEED </h4>
        
        <div>
            <strong>FAST</strong>
            <input
                type="range"
                className="input-range"
                step="0.01"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                min="0.01"
                max="1.2"
            />
            <strong>SLOW</strong>
            </div>
        </div>
    </div>
        )}
            </div>
        </div>
        </div>
    )
}

export default App