import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import HomeScreen from '../screens/HomeScreen'
import PokemonPage from '../screens/PokemonPage'
import AboutPage from '../screens/AboutPage'
import Footer from './Footer'

const PageRouter = () => {
  return (
    <>
        <NavBar/>
        <div className='w-full px-5'>
        <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/home' element={<HomeScreen/>}/>
            <Route path='/pokemon' element={<PokemonPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
        </Routes>
        </div>
        <Footer/>
    </>
  )
}

export default PageRouter