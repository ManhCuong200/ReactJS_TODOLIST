import { useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import ToDoItem from "./components/ToDoItem";
import ToDoHeader from "./components/ToDoHeader";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
        <div className="max-w-2xl mx-auto">
          <ToDoHeader onAddTask={handleOpenModal} />
          <ToDoItem />
        </div>
      </div>
      <AddTaskModal open={isModalOpen} onOpenChange={handleCloseModal} />
    </>
  );
}

export default App;
