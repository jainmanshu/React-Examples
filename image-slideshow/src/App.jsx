import { useEffect, useRef, useState } from 'react'
import { getDogs } from "./api/dogapi";
import './App.css'

function App() {
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imgIndex, setImgIndex] = useState(0)
  const dog = dogs?.[imgIndex]
  const timeoutRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true);
   const [comment, setComment] = useState("");

  const handlePrev = () => {
    setImgIndex((prev) => {
      if (prev === 0) return dogs.length - 1
      return prev - 1
    })
  }

  const handleNext = () => {
    setImgIndex((prev) => {
      if (prev === dogs.length - 1) return 0
      return prev + 1
    })
  }

  const handleUpvote = () => {
    const updated = [...dogs];
    updated[imgIndex].votes += 1;
    console.log(updated)
    setDogs(updated);
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    const updated = [...dogs];
    updated[imgIndex].comments.push(comment);
    setDogs(updated);
    setComment("");
  };

useEffect(() => {
  if (isPlaying) {
    timeoutRef.current = setTimeout(handleNext, 3000);
  }
  return () => clearTimeout(timeoutRef.current);
}, [imgIndex, isPlaying]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true)
        const data = await getDogs()
        setDogs(data.map((d) => { return {...d, comments: [], votes: 0 } }))
      } catch(e) {
        setError(e?.message)
        console.error(e?.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDogs()
  }, [])

  if (error) return (<>Error</>)
  
  if (loading) return (<>...</>)

  return (
    <>
      <h1>Rate your Favorite Dogs</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </button>
      <div className='slideshow-container'>
            <img alt={dog?.title} src={dog?.url}/>
            <h2>{dog?.title}</h2>
      </div>
      <div className='interaction'>   
      <div className='btn-container'>
        <button onClick={() => handlePrev()}>PREV</button>
        <div className='vote'>
          <input type='text' name="comments" onChange={(e) => setComment(e.target.value)} value={comment}/>
           <button onClick={handleCommentSubmit}>Post</button>
              <button onClick={() => handleUpvote()}>VOTE:{dog?.votes || 0}</button>
          </div>
             <button onClick={() => handleNext()}>NEXT</button>
      </div>
      {
      dog?.comments?.map((comment, index) => <div key={index}><span>{comment}</span></div>)
      }
      </div>
    </>
  )
}

export default App
