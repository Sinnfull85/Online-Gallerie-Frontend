import './App.css'
import ExploreTime from './components/ExploreTime'
import Overview from "./components/Overview"
import Header from './components/header'
import { ThemeProvider } from '@mui/material/styles'
import theme from './muiutils/themes'
import CanvasComp from './components/CanvasInterface'
import { Routes, Route } from 'react-router-dom'
import { ReactCardSlider } from 'react-card-slider-component'

function App () {
 
  return (

    <><div className='App'>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Routes>
          <Route path='canvas' element={<CanvasComp />} />
          <Route path="gallery" element={<Overview />} />
        </Routes>
        <ExploreTime theme={theme}></ExploreTime>{' '}
      </ThemeProvider>
    </div>
    <div className='Carousel'>
      <ThemeProvider theme={theme}>
        <ReactCardSlider theme={theme}></ReactCardSlider>{' '}
      </ThemeProvider>    
    </div></>

  )
}

export default App