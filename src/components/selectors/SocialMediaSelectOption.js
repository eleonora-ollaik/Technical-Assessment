import React, {useState, useEffect} from 'react'

function SocialMediaSelectOption() {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        getMedia()
    }, [])

    const getMedia = async () => {
        const res = await fetch('/socialmedia');
        const data = await res.json();
        setMedia(data)
        // console.log(media)
    }
    return (
            media.length === 0 ? (<option>No Social Media types in the list</option>) : (
                media.map(type => <option key={type.id}>{type.name}</option>)
                )
    )
}

export default SocialMediaSelectOption