import React, { useState } from 'react';
import './index.css';

const initialTasks = [
  { id: 1, title: 'Wake up early and drink water', completed: false },
  { id: 2, title: '30 minutes of stretching and jogging', completed: false },
  { id: 3, title: 'Read a chapter of the React book', completed: false },
  { id: 4, title: 'Get 8 hours of restful sleep', completed: false },
  { id: 5, title: 'Check emails', completed: false },
  { id: 6, title: 'Plan the next day', completed: false }
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay()]);

  // Toggle checkbox state
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Separate tasks into two halves for both sides
  const half = Math.ceil(tasks.length / 2);
  const leftTasks = tasks.slice(0, half);
  const rightTasks = tasks.slice(half);

  return (
    <div className="app-container">
      {/* Top Bar with No Color */}
      <header className="top-bar">
        <div className="days-container">
          {DAYS.map(day => (
            <div key={day} className="day-wrapper">
              <button 
                className={`day-btn ${selectedDay === day ? 'active-day' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
              <div className="dots-container">
                <span className="pending-dot"></span>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        
        {/* Left Side Tasks */}
        <div className="left-panel">
          <ul className="task-list">
            {leftTasks.map(task => (
              <li key={task.id} className="task-item">
                <span className={task.completed ? "completed-text" : ""}>{task.title}</span>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)} 
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Tasks */}
        <div className="right-panel">
          <ul className="task-list">
            {rightTasks.map(task => (
              <li key={task.id} className="task-item">
                <span className={task.completed ? "completed-text" : ""}>{task.title}</span>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)} 
                />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}