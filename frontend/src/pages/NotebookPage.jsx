import { useEffect, useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";

export default function NotebookPage() {
  const [vocab, setVocab] = useState([]);

  const fetchVocabulary = () => {
    fetch("http://127.0.0.1:5000/get_vocabulary")
      .then((response) => response.json())
      .then((data) => {
        setVocab(data.vocab);
      });
  };

  useEffect(() => {
    fetchVocabulary();
  }, []);

  return (
    <>
      <Header />
      <p>Notebook Page</p>
      <InputField
        mode="vocabulary"
        setVocab={setVocab}
        fetchVocabulary={fetchVocabulary}
      />
      <ul>
        {vocab.map((item) => (
          <li key={item.id}>
            {item.word} : {item.meaning}
          </li>
        ))}
      </ul>
    </>
  );
}
