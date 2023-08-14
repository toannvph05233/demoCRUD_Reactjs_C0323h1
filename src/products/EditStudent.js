import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";


const EditStudent = () => {
    const [student, setStudent] = useState({name: "", id: 0, img: "", classRoom: {id: 1}});
    const [idRoom, setIdRoom] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8080/students/edit/" + id)
            .then(data => {
                // console.log(data.data)
                setStudent(data.data);
            })
            .catch(function (err) {
                console.log(err)
            })
    },[]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let obj = {...student, [name]: value}
        setStudent(obj);
    };

    const handleInputChangeIdRoom = (e) => {
        const value = e.target;
        setIdRoom(value);
    };

    const edit = () => {
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
                    <th><input name="name" value={student.name} onChange={handleInputChange}/></th>
                </tr>
                <tr>
                    <th>img</th>
                    <th><input value={student.img} name="img" onChange={handleInputChange}/></th>
                </tr>
                <tr>
                    <th>IdClass</th>
                    <th><input value={student.classRoom.id} onChange={handleInputChangeIdRoom}/></th>
                </tr>

                <button onClick={edit}>Create</button>

                </thead>
            </table>
        </div>
    )
}

export default EditStudent;

