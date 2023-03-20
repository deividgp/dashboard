import { useEffect, useRef, useState } from 'react'
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

function Weather(props) {
  const intervalRef = useRef(0)
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState('')
  const [auxCity, setAuxCity] = useState('')
  const [currentTemp, setCurrentTemp] = useState(0)

  useEffect(() => {
    if (props.id === undefined) return

    const auxCity2 = JSON.parse(localStorage.getItem(props.id))
    if (auxCity2) {
      setCity(auxCity2)
    }
  }, [])

  useEffect(() => {
    if (city === '') return
    localStorage.setItem(props.id, JSON.stringify(city))
    setOpen(false)
    clearInterval(intervalRef)
    fetchInterval()
    intervalRef.current = setInterval(fetchInterval, 60000)
  }, [city])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (e) => {
    setAuxCity(e.target.value)
  }
  const fetchInterval = () => {
    fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + city, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    })
      .then((res) => res.json())
      .then((json) => setCurrentTemp(json.current.temp_c))
      .catch((err) => console.error('error:' + err))
  }

  const handleAccept = () => {
    setCity(auxCity)
  }

  return (
    <>
      <Button onClick={handleOpen}>Set up</Button>
      <br />
      <span>{city}</span>
      <br />
      {city !== '' && <span>{currentTemp} C</span>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Input value={auxCity} placeholder='City' onChange={handleChange} />
          <Button onClick={handleAccept}>Accept</Button>
        </Box>
      </Modal>
    </>
  )
}

export default Weather
