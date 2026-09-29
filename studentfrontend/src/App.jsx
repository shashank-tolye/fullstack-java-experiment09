import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const API_URL =
    "http://localhost:8080/api/students";

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch students"
        );
      }

      const data = await response.json();

      setStudents(data);

    } catch (error) {

      console.error(
        "Error fetching students:",
        error
      );

    }
  };

  const addStudent = async (event) => {

    event.preventDefault();

    const newStudent = {
      name: name,
      email: email
    };

    try {

      const response = await fetch(
        API_URL,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(newStudent)

        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to add student"
        );
      }

      const addedStudent =
        await response.json();

      setStudents(
        (previousStudents) => [
          ...previousStudents,
          addedStudent
        ]
      );

      setName("");
      setEmail("");

    } catch (error) {

      console.error(
        "Error adding student:",
        error
      );

    }
  };

  return (

    <div className="container">

      <h1>
        Student Management System
      </h1>

      <form onSubmit={addStudent}>

        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <button type="submit">
          Add Student
        </button>

      </form>

      <h2>Student List</h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>

        </thead>

        <tbody>

          {students.map(
            (student) => (

              <tr key={student.id}>

                <td>{student.id}</td>

                <td>
                  {student.name}
                </td>

                <td>
                  {student.email}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;