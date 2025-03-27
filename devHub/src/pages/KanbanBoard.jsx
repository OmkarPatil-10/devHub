import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MoreVertical } from "lucide-react";

const KanbanBoard = ({ teamId }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    "in-progress": [],
    done: [],
  });

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Fetch Tasks from Backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks/${teamId}`);
      setTasks({
        todo: response.data.todo || [],
        "in-progress": response.data.inProgress || [],
        done: response.data.done || [],
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Create a New Task
//   const handleCreateTask = async () => {
//     if (!editingTask?.title.trim()) return alert("Task title is required!");

//     try {
//       const response = await axios.post("http://localhost:3000/api/tasks/create", {
//         ...editingTask,
//         teamId,
//       });

//       setTasks((prev) => ({
//         ...prev,
//         [editingTask.status]: [...prev[editingTask.status], response.data],
//       }));

//       setEditingTask(null); // ✅ Close modal
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };
const handleCreateTask = async () => {
    if (!editingTask.title.trim()) return alert("Task title is required!");
  
    try {
      const response = await axios.post("http://localhost:3000/api/tasks/create", {
        ...editingTask,
        teamId,
      });
  
      setTasks((prev) => ({
        ...prev,
        [editingTask.status]: [...prev[editingTask.status], response.data],
      }));
  
      setEditingTask(null); // Close modal
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  

  // ✅ Update Task
  const handleUpdateTask = async () => {
    if (!editingTask?.title.trim()) return alert("Task title is required!");

    try {
      await axios.put(`http://localhost:3000/api/tasks/${editingTask._id}`, editingTask);

      setTasks((prev) => ({
        ...prev,
        [editingTask.status]: prev[editingTask.status].map((task) =>
          task._id === editingTask._id ? { ...task, ...editingTask } : task
        ),
      }));

      setEditingTask(null); // ✅ Close modal
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Delete Task
  const handleDeleteTask = async (taskId, status) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);

      setTasks((prev) => ({
        ...prev,
        [status]: prev[status].filter((task) => task._id !== taskId),
      }));

      setEditingTask(null); // ✅ Close modal immediately
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✅ Drag-and-Drop Functionality
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;

    const taskToMove = tasks[source.droppableId][source.index];

    const newSourceTasks = [...tasks[source.droppableId]];
    newSourceTasks.splice(source.index, 1);

    const newDestinationTasks = [...tasks[destination.droppableId]];
    newDestinationTasks.splice(destination.index, 0, { ...taskToMove, status: destination.droppableId });

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: newSourceTasks,
      [destination.droppableId]: newDestinationTasks,
    }));

    try {
      await axios.put(`http://localhost:3000/api/tasks/${taskToMove._id}`, {
        status: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // ✅ Priority Colors
  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <DragDropContext onDragEnd={onDragEnd}>
        {["todo", "in-progress", "done"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-80 bg-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold capitalize mb-3">{status.replace("-", " ")}</h2>
                {tasks[status].map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative bg-gray-50 p-3 mb-2 rounded-md shadow-sm cursor-pointer"
                      >
                        <h3 className="text-sm font-medium">{task.title}</h3>
                        <p className="text-xs text-gray-500">{task.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              priorityColors[task.priority?.toLowerCase() || "low"]
                            } text-white`}
                          >
                            {task.priority ? `${task.priority} priority` : "Low priority"}
                          </span>

                          {/* Three-dot Menu */}
                          <button
                            onClick={() => setEditingTask(task)}
                            className="text-gray-600 hover:text-black"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <button
                  onClick={() => setEditingTask({ title: "", description: "", priority: "medium", status: status })}
                  className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md"
                >
                  + Add Task
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>

      {/* Edit/Create Task Modal */}
      {/* {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-3">{editingTask._id ? "Edit Task" : "New Task"}</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Task Title"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            />
            <textarea
              className="w-full p-2 border rounded mb-2"
              placeholder="Task Description"
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            ></textarea>
            <button
              onClick={editingTask._id ? handleUpdateTask : handleCreateTask}
              className="mt-3 w-full bg-green-500 text-white p-2 rounded-md"
            >
              {editingTask._id ? "Update Task" : "Create Task"}
            </button>
            {editingTask._id && (
              <button
                onClick={() => handleDeleteTask(editingTask._id, editingTask.status)}
                className="mt-2 w-full bg-red-500 text-white p-2 rounded-md"
              >
                Delete Task
              </button>
            )}
            <button
              onClick={() => setEditingTask(null)}
              className="mt-2 w-full bg-gray-300 text-black p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
      {/* Add Task Modal */}
{editingTask && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-lg font-semibold mb-3">New Task</h2>

      {/* Task Title Input */}
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Task Title"
        value={editingTask.title}
        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
      />

      {/* Task Description Input */}
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Task Description"
        value={editingTask.description}
        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
      ></textarea>

      {/* Priority Dropdown */}
      <select
        className="w-full p-2 border rounded mb-2"
        value={editingTask.priority}
        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>

      {/* Create Task Button */}
      <button
        // onClick={handleCreateTask}
        onClick={editingTask._id ? handleUpdateTask : handleCreateTask}
        className="mt-3 w-full bg-green-500 text-white p-2 rounded-md"
      >
        {editingTask._id ? "Update Task" : "Create Task"}
      </button>
      {editingTask._id && (
              <button
                onClick={() => handleDeleteTask(editingTask._id, editingTask.status)}
                className="mt-2 w-full bg-red-500 text-white p-2 rounded-md"
              >
                Delete Task
              </button>
            )}
      {/* Cancel Button */}
      <button
        onClick={() => setEditingTask(null)}
        className="mt-2 w-full bg-gray-300 text-black p-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default KanbanBoard;