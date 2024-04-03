import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import CompletedTasks from "./components/CompletedTasks";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${baseURL}/completed`)
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
    
      <div className="container">
        <h1 className="title">ToDo App</h1>
        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>
        <div className="list">
        {toDos
  .filter((el) => !el.completed) 
  .map((el) => (
    <ToDo
      key={el._id}
      text={el.toDo}
      id={el._id}
      complete={el.complete}
      setUpdateUI={setUpdateUI}
      setShowPopup={setShowPopup}
      setPopupContent={setPopupContent}
    />
  ))}

        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
        <CompletedTasks completedTasks={toDos} />
    </main>
  );
};

export default App;
