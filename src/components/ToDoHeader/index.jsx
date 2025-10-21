import React from "react";

const TodoHeader = ({
  onOpenTask,
  totalCompeleted,
  totalTasks,
  percentCompeleted,
  totalInprogress,
}) => {
  return (
    <>
      <div className="bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none p-8 mb-8">
        <h1 className="text-4xl font-black text-center mb-2 text-black">
          FUTURE TO DO LIST
        </h1>
        <p className="text-lg font-bold text-black text-center mb-6">
          Your mission control dashboard
        </p>
        <div className="bg-cyan-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none p-6 mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-black mb-4">
              MISSION PROGRESS
            </h2>
            <div
              className={`text-3xl font-black mb-4 text-center ${
                totalCompeleted === totalTasks && totalTasks > 0
                  ? "text-green-600"
                  : "text-black"
              }`}
            >
              <span>
                {totalTasks > 0 && totalCompeleted !== totalTasks && (
                  <>
                    You've completed {totalCompeleted}/{totalTasks} tasks
                  </>
                )}
                {(totalTasks === 0 ||
                  (totalCompeleted === totalTasks && totalTasks > 0)) && (
                  <span className="text-green-600">ALL MISSIONS COMPLETE!</span>
                )}
              </span>
            </div>
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none h-8 overflow-hidden">
              <div
                className="bg-green-400 h-full border-r-3 border-black transition-all duration-500 flex items-center justify-center"
                style={{
                  width: `${percentCompeleted}%`,
                }}
              >
                {totalTasks > 0 && percentCompeleted > 0 && (
                  <span className="text-black font-black text-sm">
                    {percentCompeleted}%
                  </span>
                )}
              </div>
            </div>
            <p className="text-lg font-bold text-black mt-4 ">
              {totalInprogress === 0
                ? "Ready for launch!"
                : totalInprogress + " missions remaining"}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenTask}
          className="bg-green-300 w-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none p-4 inline-block hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
        >
          <p className="text-xl font-black text-black">Add New Task</p>
        </button>
        <div className="flex gap-3 mt-6">
          <button className="px-4 w-full py-2 border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000] bg-yellow-300">
            All
          </button>
          <button className="px-4 w-full bg-green-300 py-2 border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000]  bg-gray-200">
            Active
          </button>
          <button className="px-4 bg-orange-300 py-2 w-full border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000] bg-gray-200">
            Completed
          </button>
        </div>
        <input
          placeholder="Search tasks..."
          className="w-full mt-6 p-3 border-3 border-black shadow-[3px_3px_0px_#000] focus:outline-none bg-white placeholder-gray-400"
          type="text"
        />
      </div>
    </>
  );
};

export default TodoHeader;
