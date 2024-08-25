import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Header from './componentes/Header'
import { useState } from 'react'


const App = () => {
  
  let [showNav, setShowNav] = useState(false)
  return (
    <BrowserRouter>
     <Header setShowNav={setShowNav} showNav={showNav}/>
      <Routes>
        <Route path='/' element={<Home setShowNav={setShowNav} showNav={showNav}/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App