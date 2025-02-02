//*SPREJME VSE TASKE IN JIH PRIKAŽE NA STRANI Z UPORABO TASKITEM KOMPONENTE

import { VStack } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  toggleTask,
  deleteTask,
  startEditing,
  saveTask,
  isEditing,
  setEditedTask,
  editedTask,
  search,
  filter,
}) => {
  // Najprej filtriramo po kategoriji
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // Vse naloge
  });

  // Nato filtriramo po iskanju
  const searchedTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <VStack
        overflowY="auto"
        maxH="60vh"
        mt={10}
        spacing={2}
        align="stretch"
        w="100%"
        //navpični drsnik
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#FF8C00",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#FFA500",
          },
        }}
      >
        {searchedTasks.map((t, index) => (
          <TaskItem
            key={index}
            task={t}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            saveTask={saveTask}
            isEditing={isEditing}
            setEditedTask={setEditedTask}
            editedTask={editedTask}
          />
        ))}
      </VStack>
    </>
  );
};

export default TaskList;
