import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [header, setHeader] = useState("");
  const [input, setInput] = useState("");
  const [isHeaderLocked, setIsHeaderLocked] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Stochează indexul task-ului care este editat
  const [editText, setEditText] = useState(""); // Stochează textul editat
  const [date, setDate] = useState("");

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

      // Setează data curentă când se blochează headerul
      const today = new Date();
      const formattedDate = today.toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      setDate(formattedDate);
    }
  };

  const startEditing = (index) => {
    if (editIndex !== null) {
      setEditIndex(null); // Închide editarea anterioară înainte de a începe una nouă
      setTimeout(() => {
        setEditIndex(index);
        setEditText(tasks[index]);
      }, 0); // Se asigură că editarea precedentă se închide înainte de a deschide alta
    } else {
      setEditIndex(index);
      setEditText(tasks[index]);
    }
  };

  const saveEdit = (e, index) => {
    if (e.key === "Enter" && editText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editText;
      setTasks(updatedTasks);
      setEditIndex(null); // Închide editarea
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className="page">
      {/* Container pentru header și dată */}
      <div className="header-wrapper">
        <span className="date">{date}</span> 
        <div className="header-container">
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
        </div>
      </div>
  
      <ul className="list">
        {tasks.map((task, index) => (
          <li key={index} className="task">
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input id={`check-${index}`} type="checkbox" />
                <label htmlFor={`check-${index}`}></label>
              </div>
            </div>

            {editIndex === index ? (
              <input 
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => saveEdit(e, index)}
                onBlur={cancelEdit}
                className="edit-input"
                autoFocus
              />
            ) : (
              <span className="task-text">{task}</span>
            )}

            <div className="task-buttons">
              <button onClick={() => startEditing(index)} className="edit-btn">✏️</button>
              <button onClick={() => setTasks(tasks.filter((_, i) => i !== index))} className="delete-btn">❌</button>
            </div>
          </li>
        ))}
        
        {tasks.length < 10 && (
          <li className="task">
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input type="checkbox" disabled />
                <label></label>
              </div>
            </div>
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
