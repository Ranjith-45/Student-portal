import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {

  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    fname: "",
    lname: "",
    age: "",
    marks: ""
  });

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  // Backend URL
  const BASE_URL = "http://localhost:9999/stud";


  // =========================
  // GET ALL STUDENTS
  // =========================
  const getAllStudents = async () => {

    try {

      const response = await axios.get(
        `${BASE_URL}/getAllStudent`
      );

      setStudents(response.data);

    } catch (error) {

      console.log(error);
      alert("Cannot get students");

    }
  };


  // =========================
  // INSERT STUDENT
  // =========================
  const addStudent = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${BASE_URL}/ss`,
        student
      );

      alert("Student added successfully");

      setStudent({
        fname: "",
        lname: "",
        age: "",
        marks: ""
      });

      getAllStudents();

    } catch (error) {

      console.log(error);
      alert("Error adding student");

    }
  };


  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // GET STUDENT BY ID
  // =========================
  const getStudentById = async () => {

    if (!searchId) {
      alert("Enter ID");
      return;
    }

    try {

      const response = await axios.get(
        `${BASE_URL}/getStudent/${searchId}`
      );

      setStudents([response.data]);

    } catch (error) {

      console.log(error);
      alert("Student not found");

    }
  };


  // =========================
  // GET STUDENT BY NAME
  // =========================
  const getStudentByName = async () => {

    if (!searchName) {
      alert("Enter name");
      return;
    }

    try {

      const response = await axios.get(
        `${BASE_URL}/getByName/${searchName}`
      );

      setStudents(response.data);

    } catch (error) {

      console.log(error);
      alert("Student not found");

    }
  };


  // =========================
  // DELETE STUDENT
  // =========================
  const deleteStudent = async (id) => {

    try {

      await axios.delete(
        `${BASE_URL}/delete/${id}`
      );

      alert("Student deleted");

      getAllStudents();

    } catch (error) {

      console.log(error);
      alert("Delete failed");

    }
  };


  // =========================
  // PAGE LOAD
  // =========================
  useEffect(() => {

    getAllStudents();

  }, []);


  return (

    <div className="container">

      <h1>Student Management System</h1>


      {/* ================= INSERT ================= */}

      <div className="box">

        <h2>Add Student</h2>

        <form onSubmit={addStudent}>

          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={student.fname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={student.lname}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={student.age}
            onChange={handleChange}
          />

          <input
            type="number"
            name="marks"
            placeholder="Marks"
            value={student.marks}
            onChange={handleChange}
          />

          <button type="submit">
            Add Student
          </button>

        </form>

      </div>


      {/* ================= SEARCH ID ================= */}

      <div className="box">

        <h2>Search By ID</h2>

        <input
          type="number"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <button onClick={getStudentById}>
          Search
        </button>

      </div>


      {/* ================= SEARCH NAME ================= */}

      <div className="box">

        <h2>Search By Name</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <button onClick={getStudentByName}>
          Search
        </button>

      </div>


      {/* ================= ALL STUDENTS ================= */}

      <div className="box">

        <h2>Students</h2>

        <button onClick={getAllStudents}>
          Get All Students
        </button>


        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Marks</th>
              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {students.map((s) => (

              <tr key={s.sid}>

                <td>{s.sid}</td>

                <td>{s.fname}</td>

                <td>{s.lname}</td>

                <td>{s.age}</td>

                <td>{s.marks}</td>

                <td>

                  <button
                    onClick={() => deleteStudent(s.sid)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default App;