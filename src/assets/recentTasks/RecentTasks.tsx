
import { useEffect, useState } from 'react';
import './RecentTasks.css';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface Task {
    title: string;
    description: string;
    category: string;
}

const stateTransitions: { [key: string]: string[] } = {
    'ToDo': ['InProgress'],
    'InProgress': ['InQA', 'Blocked'],
    'InQA': ['Done', 'ToDo'],
    'Done': ['Deployed'],
    'Deployed': [],
    'Blocked': ['ToDo']
};

const RecentTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCategory, setEditCategory] = useState('');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleDeleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleEditTask = (index: number) => {
        setEditingIndex(index);
        setEditTitle(tasks[index].title);
        setEditDescription(tasks[index].description);
        setEditCategory(tasks[index].category);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editingIndex] = { title: editTitle, description: editDescription, category: editCategory };
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setEditingIndex(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    return (
        <div className="recentTasksBox">
            <h2>Recent Tasks</h2>
            {tasks.map((task, index) => (
                <div key={index} className="taskBox">
                    {editingIndex === index ? (
                        <>
                            <TextField
                                label="Task Title"
                                variant="outlined"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                fullWidth
                                style={{marginTop: '1rem'}}
                            />
                            <FormControl variant="outlined" fullWidth style={{marginTop: '1rem'}}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value as string)}
                                    label="Status"
                                >
                                    {stateTransitions[tasks[index].category].map((state) => (
                                        <MenuItem key={state} value={state}>{state}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveEdit}
                                style={{marginTop: '1rem'}}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancelEdit}
                                style={{marginTop: '1rem', marginLeft: '1rem'}}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <h3><strong>Title:</strong> {task.title}</h3>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Status:</strong> {task.category}</p>
                            {task.category === 'Deployed' ? (
                                <div>
                                    <p><strong>Task Completed</strong></p>
                                    <Button variant="contained" onClick={() => handleDeleteTask(index)}>DELETE</Button>
                                </div>


                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditTask(index)}
                                        style={{marginRight: '1rem'}}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteTask(index)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RecentTasks;


