import { data, Link } from "react-router-dom";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import InputField from "../components/InputField";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_number")
      .then((response) => response.json())
      .then((data) => {
        setNumber(data.number);
      })
      .catch((error) => {
        setNumber("Error fetching data");
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_score")
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
      })
      .catch((error) => {
        setScore("Error fetching data");
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_todo")
      .then((response) => response.json())
      .then((data) => {
        setTodo(data.todo);
      })
      .catch((error) => {
        console.error(error);
        setTodo([]);
      });
  }, []);

  const deleteTodo = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/delete_todo/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodo(todo.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Calendar />
        <div>
          <div className={styles.subContainer}>
            <div className={styles.target}>
              <h3>試験日</h3>
              <h1>{number}</h1>
              <InputField
                setNumber={setNumber}
                mode="number"
                className={styles.InputField}
              />
            </div>
            <div className={styles.target}>
              <h3>得点</h3>
              <h1>{score}</h1>
              <InputField
                setScore={setScore}
                mode="score"
                className={styles.InputField}
              />
            </div>
          </div>
          <div className={styles.todo}>
            <h3>To Do</h3>
            <ul>
              {todo.map((todo) => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    onChange={() => {
                      deleteTodo(todo.id);
                    }}
                  />
                  {todo.text}
                </li>
              ))}
            </ul>
            <InputField
              setTodo={setTodo}
              mode="todo"
              className={styles.InputField}
            />
          </div>
        </div>
      </div>
    </>
  );
}
