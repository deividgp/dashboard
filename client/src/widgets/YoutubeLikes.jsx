import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Input } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function YoutubeLikes(props) {
  const [open, setOpen] = useState(false)
  const [video, setVideo] = useState('')
  const [auxVideo, setAuxVideo] = useState('')
  const [currentLikes, setCurrentLikes] = useState('')

  useEffect(() => {
    if (props.id === undefined) return

    const auxVideo2 = JSON.parse(localStorage.getItem(props.id))
    if (auxVideo2) {
      setVideo(auxVideo2)
    }
  }, [])

  useEffect(() => {
    if (video === '') return
    localStorage.setItem(props.id, JSON.stringify(video))
    setOpen(false)
    fetchSubs()
  }, [video])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (e) => {
    setAuxVideo(e.target.value)
  }
  const fetchSubs = () => {
    fetch(
      'https://youtube138.p.rapidapi.com/video/details/?id=' +
        YouTubeGetID(video),
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '4ba3df7148msh60f245f710ad9cfp13627bjsnf58013f30f59',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      }
    )
      .then((res) => res.json())
      .then((json) => setCurrentLikes(json.stats.likes))
      .catch((err) => console.error('error:' + err))
  }

  const handleAccept = () => {
    setVideo(auxVideo)
  }

  const YouTubeGetID = (url) => {
    let ID = ''
    url = url
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i)
      ID = ID[0]
    } else {
      ID = url
    }
    return ID
  }

  return (
    <>
      <Button onClick={handleOpen}>Set up</Button>
      <br />
      <a href={video}>Video</a>
      <br />
      {video !== '' && <span>{currentLikes} likes</span>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Input
            value={auxVideo}
            placeholder='Youtube video link'
            onChange={handleChange}
          />
          <Button onClick={handleAccept}>Accept</Button>
        </Box>
      </Modal>
    </>
  )
}

export default YoutubeLikes
