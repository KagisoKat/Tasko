import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/tasks`);
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks. Please check if the backend is running.');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) {
            alert('Please enter a task title');
            return;
        }

        try {
            await axios.post(`${API_URL}/api/tasks`, {
                ...newTask,
                status: 'pending'
            });
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (err) {
            setError('Failed to create task');
            console.error('Error creating task:', err);
        }
    };

    const updateTask = async (id, updates) => {
        try {
            await axios.put(`${API_URL}/api/tasks/${id}`, updates);
            fetchTasks();
            setEditingTask(null);
        } catch (err) {
            setError('Failed to update task');
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`${API_URL}/api/tasks/${id}`);
                fetchTasks();
            } catch (err) {
                setError('Failed to delete task');
                console.error('Error deleting task:', err);
            }
        }
    };

    const changeStatus = async (task, newStatus) => {
        await updateTask(task.id, { ...task, status: newStatus });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'pending': 'status-pending',
            'in-progress': 'status-progress',
            'completed': 'status-completed'
        };
        return statusColors[status] || 'status-pending';
    };

    if (loading) {
        return (
            <div className="App">
                <div className="loading">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="app-header">
                <h1>🎯 Tasko</h1>
                <p>Manage your tasks efficiently</p>
            </header>

            {error && (
                <div className="error-banner">
                    {error}
                    <button onClick={() => setError(null)} className="close-btn">×</button>
                </div>
            )}

            <div className="container">
                {/* Create Task Form */}
                <div className="task-form-container">
                    <h2>Create New Task</h2>
                    <form onSubmit={createTask} className="task-form">
                        <input
                            type="text"
                            placeholder="Task title..."
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="input-field"
                        />
                        <textarea
                            placeholder="Task description (optional)..."
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="input-field"
                            rows="3"
                        />
                        <button type="submit" className="btn btn-primary">
                            ➕ Add Task
                        </button>
                    </form>
                </div>

                {/* Task Statistics */}
                <div className="stats-container">
                    <div className="stat-card">
                        <span className="stat-number">{tasks.length}</span>
                        <span className="stat-label">Total Tasks</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{tasks.filter(t => t.status === 'pending').length}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{tasks.filter(t => t.status === 'in-progress').length}</span>
                        <span className="stat-label">In Progress</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{tasks.filter(t => t.status === 'completed').length}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="tasks-container">
                    <h2>Your Tasks</h2>
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks yet. Create your first task above! 🚀</p>
                        </div>
                    ) : (
                        <div className="tasks-grid">
                            {tasks.map((task) => (
                                <div key={task.id} className="task-card">
                                    {editingTask?.id === task.id ? (
                                        <div className="task-edit-form">
                                            <input
                                                type="text"
                                                value={editingTask.title}
                                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                                className="input-field"
                                            />
                                            <textarea
                                                value={editingTask.description}
                                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                                className="input-field"
                                                rows="3"
                                            />
                                            <div className="edit-actions">
                                                <button
                                                    onClick={() => updateTask(task.id, editingTask)}
                                                    className="btn btn-success"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingTask(null)}
                                                    className="btn btn-secondary"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="task-header">
                                                <h3>{task.title}</h3>
                                                <span className={`status-badge ${getStatusBadge(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </div>

                                            {task.description && (
                                                <p className="task-description">{task.description}</p>
                                            )}

                                            <div className="task-meta">
                                                <small>Created: {new Date(task.created_at).toLocaleDateString()}</small>
                                            </div>

                                            <div className="task-actions">
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => changeStatus(task, e.target.value)}
                                                    className="status-select"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </select>

                                                <button
                                                    onClick={() => setEditingTask(task)}
                                                    className="btn btn-edit"
                                                    title="Edit task"
                                                >
                                                    ✏️
                                                </button>

                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="btn btn-delete"
                                                    title="Delete task"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer className="app-footer">
                <p>Built with React, Express, PostgreSQL & Docker 🚀</p>
            </footer>
        </div>
    );
}

export default App;
