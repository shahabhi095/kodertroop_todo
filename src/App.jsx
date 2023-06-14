
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


import Navbar from './components/Navbar'
import DisplayTodoList from './pages/TodoList'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<DisplayTodoList />} />
  
      </Routes>
    </Box>
  );
}

export default App
