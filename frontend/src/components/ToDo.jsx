import PropTypes from "prop-types";
import axios from "axios";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, completed, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  const completeToDo = () => {
    axios
      .put(`${baseURL}/complete/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="toDo">
      {text}
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
        {!completed && <AiOutlineCheck className="icon" onClick={completeToDo} />}
      </div>
    </div>
  );
};

ToDo.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  setUpdateUI: PropTypes.func.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  setPopupContent: PropTypes.func.isRequired,
};

export default ToDo;
