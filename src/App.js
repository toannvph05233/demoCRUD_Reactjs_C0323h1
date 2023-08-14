import logo from './logo.svg';
import './App.css';
import ShowStudents from "./products/ShowStudents";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateStudent from "./products/CreateStudent";
import EditStudent from "./products/EditStudent";


const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<ShowStudents/>}/>
                    <Route path="/create" element={<CreateStudent/>}/>
                    <Route path="/edit/:id" element={<EditStudent/>} />

                </Routes>
            </Router>
        </div>
    );
};


export default App;
