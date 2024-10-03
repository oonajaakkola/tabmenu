import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TodoList from './components/Todolist'; 
import Home from './components/Home'; 

function App() {
  const [value, setValue] = React.useState('/');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Container maxWidth="xl">
        <CssBaseline />
        
        {/* Tabs */}
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" value="/" component={Link} to="/" />
          <Tab label="TodoList" value="/todolist" component={Link} to="/todolist" />
        </Tabs>
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolist" element={<TodoList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
