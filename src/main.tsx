import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./assets/navBar/NavBar.tsx";
import Landing from "./assets/landing/Landing.tsx";
import Todo from "./assets/todo/Todo.tsx";
import RecentTasks from "./assets/recentTasks/RecentTasks.tsx";
import ConnectionStatus from "./assets/connection-status-parsa/src/assets/ConnectionStatus.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <BrowserRouter>
            <Routes>
                <Route element={<NavBar/>}>
                    <Route index element={<Landing/>}/>
                    <Route path={"todo"} element={<Todo/>}/>
                    <Route path={'recent-tasks'} element={<RecentTasks/>}/>
                    <Route path={'connection-status'} element={<ConnectionStatus/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
)
