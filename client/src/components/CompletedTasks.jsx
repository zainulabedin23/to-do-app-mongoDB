import PropTypes from "prop-types"; // Import PropTypes

const CompletedTasks = ({ completedTasks }) => {
  // Filter completed tasks
  const completed = completedTasks.filter(task => task.completed === true);

  return (
    <div className="completed-tasks-container">
      <h2 className="completed-tasks-header">Completed Tasks</h2>
      <ul className="completed-tasks-list">
        {completed.map((task) => (
          <li key={task._id} className="completed-task">{task.toDo}</li>
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
