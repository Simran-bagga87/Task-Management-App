import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({ description: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Edit Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ description: task.description });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token },
    };

    fetchData(config).then(() => {
      navigate("/");
    });
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="w-full sm:w-1/2 p-8 bg-white rounded-lg shadow-md border-2">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-center text-2xl font-semibold mb-6">{mode === "add" ? "Add New Task" : "Edit Task"}</h2>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write your task description here..."
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {fieldError("description")}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
                  onClick={handleSubmit}
                >
                  {mode === "add" ? "Add Task" : "Update Task"}
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                {mode === "update" && (
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 transition"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default Task;
