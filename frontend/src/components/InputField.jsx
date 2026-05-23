import "./InputField.css";
import { useState } from "react";

function InputField({
  setNumber,
  setScore,
  setTodo,
  setVocab,
  fetchVocabulary,
  mode,
  className,
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "number") {
      fetch("http://127.0.0.1:5000/save_number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: input }),
      })
        .then(() => fetch("http://127.0.0.1:5000/get_number"))
        .then((res) => res.json())
        .then((data) => setNumber(data.number));
    } else if (mode === "score") {
      fetch("http://127.0.0.1:5000/save_score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: input }),
      })
        .then(() => fetch("http://127.0.0.1:5000/get_score"))
        .then((res) => res.json())
        .then((data) => setScore(data.score));
    } else if (mode === "todo") {
      fetch("http://127.0.0.1:5000/save_todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: input,
          done: false,
        }),
      })
        .then(() => fetch("http://127.0.0.1:5000/get_todo"))
        .then((res) => res.json())
        .then((data) => setTodo(data.todo));
    } else if (mode === "vocabulary") {
      fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      }).then(() => {
        fetchVocabulary();
        setInput("");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "number"
            ? "試験日"
            : mode === "score"
              ? "スコア"
              : mode === "todo"
                ? "TODO"
                : "vocabulary"
        }
      />
      <button type="submit">Register</button>
    </form>
  );
}
export default InputField;
