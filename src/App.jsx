import { useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import ToDoItem from "./components/ToDoItem";
import ToDoHeader from "./components/ToDoHeader";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [listTasks, setlistTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = (id) => {
    const updatedTasks = listTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setlistTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const handleAddTask = () => {
    if (title.trim() === "") return;
    let updatedTasks;
    if (isEditing) {
      updatedTasks = listTasks.map((task) =>
        task.id === editingId ? { ...task, title } : task
      );
    } else {
      const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
      };
      updatedTasks = [...listTasks, newTask];
    }
    setlistTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleCloseModal();
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = listTasks.filter((task) => task.id !== id);
    setlistTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  const filteredTasks = listTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  [searchTerm, listTasks];

  const [isEditing, setIsEditing] = useState(false);

  const handleEditTask = (id) => {
    const taskToEdit = listTasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setCurrentTitle(taskToEdit.title);
      setIsEditing(true);
    }
  };

  const [currentTitle, setCurrentTitle] = useState("");
  const handleUpdateTask = () => {
    const updatedTasks = listTasks.map((task) =>
      task.id === editingId ? { ...task, title: currentTitle } : task
    );
    setlistTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsEditing(false);
  };
  const totalCompeleted = listTasks.filter((task) => task.completed).length;
  const totalTask = listTasks.length;
  const percentCompeleted = ((totalCompeleted / totalTask) * 100).toFixed(0);
  const totalInprogress = totalTask - totalCompeleted;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
        <div className="max-w-2xl mx-auto">
          <ToDoHeader
            totalInprogress={totalInprogress}
            percentCompeleted={percentCompeleted}
            totalTasks={totalTask}
            totalCompeleted={totalCompeleted}
            onOpenTask={handleOpenModal}
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
          />
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <ToDoItem
                key={task.id}
                task={task}
                handleClick={handleClick}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                isEditing={isEditing}
              />
            ))}
          </div>
        </div>
      </div>
      <AddTaskModal
        open={isModalOpen}
        title={title}
        setTitle={setTitle}
        onOpenChange={handleCloseModal}
        handleAddTask={handleAddTask}
      />
      <EditTaskModal
        open={isEditing}
        onOpenChange={setIsEditing}
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
        handleUpdateTask={handleUpdateTask}
      />
    </>
  );
}

export default App;
