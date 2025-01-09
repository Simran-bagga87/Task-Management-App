import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="my-6 mx-auto max-w-3xl p-4">
      {tasks.length > 0 && <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks ({tasks.length})</h2>}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <span className="text-lg text-gray-600">No tasks found</span>
              <Link
                to="/tasks/add"
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 font-medium transition"
              >
                + Add New Task
              </Link>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={task._id} className="bg-white my-4 p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-medium text-gray-700">Task #{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <Tooltip text="Edit this task" position="top">
                      <Link to={`/tasks/${task._id}`} className="text-green-600 hover:text-green-700 cursor-pointer">
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>
                    <Tooltip text="Delete this task" position="top">
                      <span
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <p className="text-gray-600 whitespace-pre">{task.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
