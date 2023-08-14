import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const ShowStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/students")
            .then(data => {
                // console.log(data.data)
                setStudents(data.data);
            })
            .catch(function (err) {
                console.log(err)
            })
    },[]);


    return (<>
        <div className="container">
            <h2>Student List</h2>
            <Link to={"/create"}>
                <button>Create</button>
            </Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>img</th>
                    <th>class</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map((s) => {
                        return (
                            <tr>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td><img src={s.img} width={250} height={200}/></td>
                                <td>{s.classRoom.name}</td>
                                <td>
                                    <Link to={"/edit/" + s.id}>
                                        <button type="button" className="btn btn-warning">Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>


    </>)

}

export default ShowStudents;
