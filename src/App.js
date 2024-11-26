import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DashBoardAdmin from "./Admin/DashBoardAdmin";
import Accounts from "./Admin/accounts";
import Comments from "./Admin/comments";
import ReportManagement from "./Admin/report/ReportManagement";
import Tours from "./Admin/tours";
import Blogs from "./Admin/blogs";
import Notifications from "./Admin/notifications";


const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<DashBoardAdmin/>}/>
                    <Route path={"/admin"} element={<DashBoardAdmin/>}>
                        <Route index element={<Accounts/>}/>
                        {/*<Route path="/admin/profile" element={<ProfileUser/>}/>*/}
                        <Route path="/admin/accounts" element={<Accounts/>}/>
                        <Route path="/admin/comments" element={<Comments/>}/>
                        <Route path="/admin/tours" element={<Tours/>}/>
                        <Route path="/admin/blogs" element={<Blogs/>}/>
                        <Route path="/admin/notifications" element={<Notifications/>}/>
                        <Route path="/admin/reports" element={<ReportManagement/>}/>
                    </Route>

                </Routes>
            </Router>
        </div>
    );
};


export default App;
