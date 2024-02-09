import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedDay, setSelectedDay] = useState(""); 
  const [allTodos, setTodos] = useState([[], [], [], [], [], [], []]); 
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10)); 

  const handleAddTodo = () => {
    const newTodoItem = {
      title: newTitle,
      description: newDescription,
      date: newDate
    };
    const updatedTodoArr = [...allTodos];
    const dayIndex = new Date(newDate).getDay(); 
    
    if (!Array.isArray(updatedTodoArr[dayIndex])) {
      updatedTodoArr[dayIndex] = [];
    }
    
    
   
    updatedTodoArr[dayIndex].push(newTodoItem); 
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
   
    setNewTitle("");
    setNewDescription("");
    setNewDate(new Date().toISOString().slice(0, 10));
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo && Array.isArray(savedTodo)) {
      setTodos(savedTodo);
    } else {
      
      setTodos([[], [], [], [], [], [], []]);
    }
  }, []);
  


  const filterTodosByDay = (day) => {
    setSelectedDay(day);
  };

  const handleDeleteTodo = (dayIndex, itemIndex) => {
    const updatedTodoArr = [...allTodos];
    updatedTodoArr[dayIndex].splice(itemIndex, 1); 
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };
  return (
    <div className="App">
      <h1>Mantra Technologies - Task{"\n"}</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <div>
              <label>Title : </label>
              <input className = 'lables' type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter task title" required />
            </div>
          </div>
          {"\n"}
          <div className='todo-input-item' style={{ marginBottom: '1em' }}>
            <div>
              <label>Description : </label>
              <input className = 'lables' type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter task description" />
            </div>
          </div>
          <div className='todo-input-item'>
            <div>
              <label>Date : </label>
              <input  type="date" value={newDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setNewDate(e.target.value)} required />
            </div>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primary-btn'>Save</button>
          </div>
        </div>
        <div className="btn-area">
          <div className="day-buttons"> {/* Wrapper div for day buttons */}
            <button className={`dayBtn ${selectedDay === "Monday" && 'active'}`} onClick={() => filterTodosByDay("Monday")}>Monday</button>
            <button className={`dayBtn ${selectedDay === "Tuesday" && 'active'}`} onClick={() => filterTodosByDay("Tuesday")}>Tuesday</button>
            <button className={`dayBtn ${selectedDay === "Wednesday" && 'active'}`} onClick={() => filterTodosByDay("Wednesday")}>Wednesday</button>
            <button className={`dayBtn ${selectedDay === "Thursday" && 'active'}`} onClick={() => filterTodosByDay("Thursday")}>Thursday</button>
            <button className={`dayBtn ${selectedDay === "Friday" && 'active'}`} onClick={() => filterTodosByDay("Friday")}>Friday</button>
            <button className={`dayBtn ${selectedDay === "Saturday" && 'active'}`} onClick={() => filterTodosByDay("Saturday")}>Saturday</button>
            <button className={`dayBtn ${selectedDay === "Sunday" && 'active'}`} onClick={() => filterTodosByDay("Sunday")}>Sunday</button>
          </div>
        </div>
        <div className="todo-list">
          {allTodos.map((dayTodos, index) => (
            <div key={index} style={{ display: selectedDay && selectedDay !== getDayName(index) ? 'none' : 'block' }}>
              <h2>{getDayName(index)}</h2>
              {Array.isArray(dayTodos) && dayTodos.map((item, itemIndex) => (
                <div className="todo-list-item" key={itemIndex}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Date: {item.date}</p>
                  </div>
                  <div className="delete-btn">
                    {/* <button className="edit-btn">Edit</button> */}
                    <button className="delete-btn" onClick={() => handleDeleteTodo(index, itemIndex)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function getDayName(index) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[index];
}

export default App;
