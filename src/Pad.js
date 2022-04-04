import { useState, useEffect } from 'react'

function Pad({ clip, volume, setRecording }) {

    const [active, setActive] = useState(false);

    useEffect(() => {

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    })


    const handleKeyPress = (e) => {

        if (e.keyCode === clip.keyCode) { playSound() }

    };

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger)
        setActive(true);
        setTimeout(() => setActive(false), 150);
        audioTag.currentTime = 0;
        audioTag.volume = volume;
        audioTag.play();
        setRecording(prev => prev + clip.keyTrigger + ` `)
    }


    return (
            <div className={`btn ${active && 'btn-warning'}`}
                onClick={playSound} >

                <audio className='clip' id={clip.keyTrigger} src={clip.url} />

                {clip.keyTrigger}

            </div>
    );
}

export default Pad