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
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveTask = () => {
    // debugger;
    if (title.trim() === "") return;
    let updatedTasks;
    if (editingId) {
      updatedTasks = listTasks.map((task) =>
        task.id === editingId ? { ...task, title } : task
      );
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
      };
      updatedTasks = [...listTasks, newTask];
    }
    setlistTasks(updatedTasks);
    setTitle("");
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

  const handleEditTask = (id) => {
    // const taskToEdit = listTasks.find((task) => task.id === id);
    // if (taskToEdit) {
    //   setEditingId(id);
    //   setCurrentTitle(taskToEdit.title);
    //   setIsEditing(true);
    // }
    setEditingId(id);
    setIsModalOpen(true);
    setTitle(listTasks.find((task) => task.id === id).title);
  };

  // const [currentTitle, setCurrentTitle] = useState("");
  // const handleUpdateTask = () => {
  //   if (currentTitle.trim() === "") return;
  //   const updatedTasks = listTasks.map((task) =>
  //     task.id === editingId ? { ...task, title: currentTitle } : task
  //   );
  //   setlistTasks(updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  //   setIsEditing(false);
  // };

  const [filter, setFilter] = useState("all");
  const filteredTask = listTasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            filter={filter}
            setFilter={setFilter}
            handleSearchChange={handleSearchChange}
          />
          <div className="grid gap-4">
            {filteredTask.map((task) => (
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
        handleSaveTask={handleSaveTask}
      />
    </>
  );
}

export default App;
