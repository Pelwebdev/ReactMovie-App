import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Navbar from './components/Navbar'
import './css/App.css'
import { MovieProvider } from './contexts/MovieContext'

function App() {

  return (
    <MovieProvider>
    <Navbar />
    <main className="main-content">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favorites' element={<Favorite />} />
    </Routes>
    </main>
    </MovieProvider>
  )
}

export default App
