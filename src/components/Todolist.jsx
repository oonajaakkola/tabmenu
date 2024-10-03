import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function TodoList() {
  const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef(null); 


  const columnDefs = [
    { field: 'description', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true },
  ];

  
  const inputChanged = (event) => {
    setTodo({
      ...todo,
      [event.target.name]: event.target.value,
    });
  };

  
  const addTodo = () => {
    if (todo.description && todo.date && todo.priority) {
      setTodos([...todos, todo]);
      setTodo({ description: '', date: '', priority: '' }); 
    }
  };


  const deleteSelectedTodos = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    setTodos(todos.filter(todo => !selectedData.includes(todo)));
  };

  return (
    <>
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
        sx={{ marginBottom: 2 }} 
      >
        <TextField
          label="Description"
          name="description"
          onChange={inputChanged}
          value={todo.description}
        />
        <TextField
          label="Priority"
          name="priority"
          onChange={inputChanged}
          value={todo.priority}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          onChange={inputChanged}
          value={todo.date}
        />
        <Button variant="contained" onClick={addTodo}>Add</Button>
        <Button variant="contained" color="error" onClick={deleteSelectedTodos}>Delete</Button>
      </Stack>

      <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
          onGridReady={params => gridRef.current = params.api}
        />
      </div>
    </>
  );
}

export default TodoList;
