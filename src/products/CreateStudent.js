import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateStudent = () => {
    const [student, setStudent] = useState({name: "", id: 0, img: "", classRoom: {id: 1}});
    const [idRoom, setIdRoom] = useState(1);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setStudent({...student, [name]: value});
    };

    const handleInputChangeIdRoom = (e) => {
        const value = e.target;
        setIdRoom(value);
    };

    const create = () => {
        setStudent({...student, classRoom: {id: idRoom}});
        axios.post("http://localhost:8080/students", student)
            .then(data => {
                console.log(data)
                navigate("/");

            })
            .catch(function (err) {
                console.log(err)
            })
    }

    return (
        <div className="container">
            <h2>Khởi tạo Sinh Viên</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>name</th>
                    <th><input name="name" onChange={handleInputChange}/></th>
                </tr>
                <tr>
                    <th>img</th>
                    <th><input name="img" onChange={handleInputChange}/></th>
                </tr>
                <tr>
                    <th>IdClass</th>
                    <th><input onChange={handleInputChangeIdRoom}/></th>
                </tr>

                <button onClick={create}>Create</button>

                </thead>
            </table>
        </div>
    )
}

export default CreateStudent;
