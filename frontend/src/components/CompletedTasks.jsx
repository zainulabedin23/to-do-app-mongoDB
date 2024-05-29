import PropTypes from "prop-types"; // Import PropTypes
import { RiDeleteBin6Line } from "react-icons/ri"; // Import delete icon from React Icons
import { baseURL } from "../utils/constant";
import axios from "axios"; // Import axios correctly


const CompletedTasks = ({ completedTasks, onUpdate, setUpdateUI }) => {

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      onUpdate(); // Call onUpdate function to update UI after deleting
    });
  };
  
  return (
    <div className="completed-tasks-container">
      <h2 className="completed-tasks-header">Completed Tasks</h2>
      <ul className="completed-tasks-list">
        {completedTasks.filter((task) => task.completed).map((task) => (
          <li key={task._id} className="completed-task">
            {task.toDo}
            <RiDeleteBin6Line className="delete-icon icon" onClick={() => deleteTodo(task._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
CompletedTasks.propTypes = {
  completedTasks: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  setUpdateUI: PropTypes.func.isRequired
};
// Add PropTypes validation for the completedTasks prop

export default CompletedTasks;

