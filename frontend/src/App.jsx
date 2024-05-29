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
  const [selectedOption, setSelectedOption] = useState("create");

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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleUpdateUI = () => {
    setUpdateUI(prevState => !prevState);
  };

  return (
    <main>
      <aside>
        <p>Menu</p>
        <a  onClick={() => handleOptionChange("create")}>
          <i className="fa fa-user-o" aria-hidden="true"></i>
          Create ToDo
        </a>
        <a  onClick={() => handleOptionChange("completed")}>
          <i className="fa fa-user-o" aria-hidden="true"></i>
          Completed
        </a>
      </aside>

      <div className="container">
        <h1 className="title">ToDo App</h1>
        {selectedOption === "create" && (
          <div className="input_holder">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add a ToDo..."
            />
            <button onClick={saveToDo}>Add</button>
          </div>
        )}
        {selectedOption === "create" && (
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
        )}
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
      <div className="container">
      {selectedOption === "completed" && <CompletedTasks completedTasks={toDos} onUpdateUI={handleUpdateUI} setUpdateUI={setUpdateUI} />}
      </div>
    </main>
  );
};

export default App;
