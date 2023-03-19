import { Button, FormControl } from '@mui/material'
import { useEffect, useState } from 'react'
import { WidthProvider, Responsive } from 'react-grid-layout'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './App.css'
import Weather from './widgets/Weather'
import YoutubeSubscribers from './widgets/YoutubeSubscribers'
import YoutubeLikes from './widgets/YoutubeLikes'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
const removeStyle = {
  position: 'absolute',
  right: '2px',
  top: 0,
  cursor: 'pointer'
}

function App() {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState([])
  const [widget, setWidget] = useState('')

  useEffect(() => {
    const auxItems = JSON.parse(localStorage.getItem('items'))
    if (auxItems && auxItems.length !== 0) {
      setItems(auxItems)
      setCounter(auxItems[auxItems.length - 1].i + 1)
    }
  }, [])

  const handleSelectChange = (e) => {
    setWidget(e.target.value)
  }

  const getWidget = (el) => {
    switch (el.widget) {
      case 'weather':
        return <Weather id={el.i} />
      case 'youtubesubs':
        return <YoutubeSubscribers id={el.i} />
      case 'youtubelikes':
        return <YoutubeLikes id={el.i} />
    }
  }

  const createElement = (el) => {
    const i = el.i
    return (
      <div key={i} data-grid={el}>
        <span className='text'>{getWidget(el)}</span>
        <span
          className='remove'
          style={removeStyle}
          onClick={() => handleRemoveItem(i)}
        >
          X
        </span>
      </div>
    )
  }

  const handleAddWidget = () => {
    if (widget === '') return

    setItems(
      items.concat({
        i: counter,
        widget,
        x: (items.length * 2) % 12,
        y: 5555,
        w: 2,
        h: 2
      })
    )
    localStorage.setItem(
      'items',
      JSON.stringify(
        items.concat({
          i: counter,
          widget,
          x: (items.length * 2) % 12,
          y: 5555,
          w: 2,
          h: 2
        })
      )
    )
    setCounter(counter + 1)
  }

  const handleRemoveItem = (i) => {
    setItems(items.filter((item) => item.i !== i))
    localStorage.setItem(
      'items',
      JSON.stringify(items.filter((item) => item.i !== i))
    )
    localStorage.removeItem(i)
  }

  const clearStorage = () => {
    localStorage.clear()
  }

  return (
    <>
      <Button onClick={clearStorage}>Clear local storage</Button>
      <Box sx={{ width: 150 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Widget</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={widget}
            label='Widget'
            onChange={handleSelectChange}
          >
            <MenuItem value='weather'>Weather</MenuItem>
            <MenuItem value='youtubesubs'>YT subscribers</MenuItem>
            <MenuItem value='youtubelikes'>YT likes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button onClick={handleAddWidget}>Add Widget</Button>
      <ResponsiveReactGridLayout
        className='layout'
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
      >
        {items.map((el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </>
  )
}

export default App
