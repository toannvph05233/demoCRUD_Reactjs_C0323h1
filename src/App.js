import logo from './logo.svg';
import './App.css';
import ShowStudents from "./products/ShowStudents";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateStudent from "./products/CreateStudent";
import EditStudent from "./products/EditStudent";
import DashBoardAdmin from "./Admin/DashBoardAdmin";
import Accounts from "./Admin/accounts";
import Comments from "./Admin/comments";
import ReportManagement from "./Admin/report/ReportManagement";


const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<ShowStudents/>}/>
                    <Route path="/create" element={<CreateStudent/>}/>
                    <Route path="/edit/:id" element={<EditStudent/>} />
                    <Route path={"/admin"} element={<DashBoardAdmin/>}>
                        {/*<Route index element={<ProfileUser/>}/>*/}
                        {/*<Route path="/admin/profile" element={<ProfileUser/>}/>*/}
                        <Route path="/admin/accounts" element={<Accounts/>}/>
                        <Route path="/admin/comments" element={<Comments/>}/>
                        <Route path="/admin/reports" element={<ReportManagement/>}/>
                    </Route>

                </Routes>
            </Router>
        </div>
    );
};


export default App;
