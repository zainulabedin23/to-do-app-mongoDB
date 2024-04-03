import PropTypes from "prop-types"; // Import PropTypes

const CompletedTasks = ({ completedTasks }) => {
  return (
    <div height="200px">
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task._id}>{task.toDo}</li>
        ))}
      </ul>
    </div>
  );
};

// Add PropTypes validation for the completedTasks prop
CompletedTasks.propTypes = {
  completedTasks: PropTypes.array.isRequired,
};

export default CompletedTasks;
