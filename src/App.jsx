import { useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import ToDoItem from "./components/ToDoItem";
import ToDoHeader from "./components/ToDoHeader";

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
  const handleAddTask = () => {
    if (title.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    const updatedTasks = [...listTasks, newTask];
    setlistTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTitle("");
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
    </>
  );
}

export default App;
