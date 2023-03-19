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

function YoutubeSubscribers(props) {
  const [open, setOpen] = useState(false)
  const [channel, setChannel] = useState('')
  const [auxChannel, setAuxChannel] = useState('')
  const [currentSubs, setCurrentSubs] = useState('')

  useEffect(() => {
    if (props.id === undefined) return

    const auxChannel2 = JSON.parse(localStorage.getItem(props.id))
    if (auxChannel2) {
      setChannel(auxChannel2)
    }
  }, [])

  useEffect(() => {
    if (channel === '') return
    localStorage.setItem(props.id, JSON.stringify(channel))
    setOpen(false)
    fetchSubs()
  }, [channel])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (e) => {
    setAuxChannel(e.target.value)
  }
  const fetchSubs = () => {
    fetch(
      'https://youtube-v3-alternative.p.rapidapi.com/search?type=channel&query=' +
        channel,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '4ba3df7148msh60f245f710ad9cfp13627bjsnf58013f30f59',
          'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
        }
      }
    )
      .then((res) => res.json())
      .then((json) => setCurrentSubs(json.data[0].subscriberCount))
      .catch((err) => console.error('error:' + err))
  }

  const handleAccept = () => {
    setChannel(auxChannel)
  }

  return (
    <>
      <Button onClick={handleOpen}>Set up</Button>
      <br />
      <span>{channel}</span>
      <br />
      {channel !== '' && <span>{currentSubs}</span>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Input
            value={auxChannel}
            placeholder='Channel'
            onChange={handleChange}
          />
          <Button onClick={handleAccept}>Accept</Button>
        </Box>
      </Modal>
    </>
  )
}

export default YoutubeSubscribers
