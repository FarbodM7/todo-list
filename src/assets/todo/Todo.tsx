import { useState, useEffect } from 'react';
import './Todo.css';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    DialogContentText,
    Dialog,
    DialogTitle, DialogContent
} from '@mui/material';
import { NavLink } from 'react-router-dom';

interface Task {
    title: string;
    description: string;
    category: string;
}

const initialStates = ['ToDo'];

const TodoList  = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('ToDo');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleAddTask = () => {
        const newTask = { title, description, category };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setTitle('');
        setDescription('');
        setCategory('ToDo');
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };

    return (
        <div className="todoBox">
            <div className="taskHeader">
                <span className="addTaskH1">ADD TASK</span>
            </div>
            <div className="taskBody">
                <span className="taskLabel">Task Title</span>
                <TextField
                    className="titleBox"
                    label="What do you wanna do today?"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <span className="taskLabel">Description</span>
                <TextField
                    className="descriptionBox"
                    label="Tell me more about your task..."
                    multiline
                    rows={13}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Status"
                    >
                        {initialStates.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="taskFooter">
                <Button
                    variant="contained"
                    className="applyButton"
                    onClick={handleAddTask}
                >
                    Apply
                </Button>
                <NavLink to='/recent-tasks' className="recentTaskButton">
                    <Button variant="outlined" style={{ width: '100%' }}>
                        Recent Tasks
                    </Button>
                </NavLink>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Submitted!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can review your tasks on Recent Tasks section.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TodoList;


