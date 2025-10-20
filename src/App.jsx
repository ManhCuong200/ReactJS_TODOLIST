import { useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import ToDoItem from "./components/ToDoItem";
import ToDoHeader from "./components/ToDoHeader";

function App() {
  const [listTasks, setlistTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        title: "Learn React components",
        completed: true,
      },
      {
        id: 2,
        title: "Master Javascript props",
        completed: true,
      },
      {
        id: 3,
        title: "Master Nodejs props",
        completed: true,
      },
    ]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClick = (id) => {
    setlistTasks(
      listTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
          />
          <div className="grid gap-4">
            {listTasks.map((task, index) => (
              <ToDoItem key={index} task={task} handleClick={handleClick} />
            ))}
          </div>
        </div>
      </div>
      <AddTaskModal open={isModalOpen} onOpenChange={handleCloseModal} />
    </>
  );
}

export default App;
