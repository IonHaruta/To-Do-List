import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [header, setHeader] = useState("");
  const [input, setInput] = useState("");
  const [isHeaderLocked, setIsHeaderLocked] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Stochează indexul task-ului care este editat
  const [editText, setEditText] = useState(""); // Stochează textul editat

  const addTask = (e) => {
    if (e.key === "Enter" && input.trim() !== "" && tasks.length < 10) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const addHeader = (e) => {
    if (e.key === "Enter" && header.trim() !== "") {
      e.preventDefault();
      setIsHeaderLocked(true);
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index]); // Setează textul curent al task-ului în input
  };

  const saveEdit = (e, index) => {
    if (e.key === "Enter" && editText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editText; // Actualizează textul task-ului în array
      setTasks(updatedTasks);
      setEditIndex(null); // Oprește editarea după salvare
    }
  };

  return (
    <div className="page">
      {!isHeaderLocked ? (
        <input 
          type="text"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          onKeyDown={addHeader}
          placeholder="What is your to do list about?"
          className="header"
        />
      ) : (
        <h2 className="header-text">{header}</h2>
      )}

      <ul className="list">
        {tasks.map((task, index) => (
          <li key={index} className="task">
            <span className="task-number">{index + 1}.</span> {/* Numerotare */}
            
            {/* Dacă task-ul este în modul editare, afișează un input în loc de text */}
            {editIndex === index ? (
              <input 
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => saveEdit(e, index)}
                className="edit-input"
                autoFocus
              />
            ) : (
              <span className="task-text">{task}</span>
            )}

            <div className="task-buttons">
              <input 
                type="checkbox" 
                className="checkbox"
              />
              <button onClick={() => startEditing(index)} className="edit-btn">✏️</button>
              <button onClick={() => setTasks(tasks.filter((_, i) => i !== index))} className="delete-btn">❌</button>
            </div>
          </li>
        ))}
        {tasks.length < 10 && (
          <li className="task">
            <span className="task-number">{tasks.length + 1}.</span> {/* Numerotare */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={addTask}
              placeholder="Type a task..."
              className="input"
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
