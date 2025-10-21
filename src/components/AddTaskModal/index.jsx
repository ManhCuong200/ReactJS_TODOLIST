import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const AddTaskModal = ({
  open,
  onOpenChange,
  handleAddTask,
  title,
  setTitle,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-4 border-black bg-pink-200 shadow-[6px_6px_0px_#000] p-6 
                   sm:max-w-lg max-w-[calc(100%-2rem)] rounded-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Task</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <input
            placeholder="Enter task title..."
            type="text"
            className="flex h-9 w-full rounded-md border-3 border-black px-3 py-1 
                       text-base shadow-xs outline-none bg-transparent 
                       focus-visible:ring-2 focus-visible:ring-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <button
            onClick={() => handleAddTask()}
            className="inline-flex items-center justify-center h-9 px-4 rounded-md font-bold
                       border-4 border-black bg-green-300 text-black
                       shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1
                       hover:shadow-[2px_2px_0px_#000] transition-all"
          >
            Save Task
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
