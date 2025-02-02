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
  const filteredTasks =
    tasks?.filter((task) => {
      if (filter === "completed") return task?.completed;
      if (filter === "incomplete") return !task?.completed;
      return true;
    }) || []; // Če so taski undefined vrne empty array da se izognemo napaki

  // Nato filtriramo po iskanju
  const searchedTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );
  return (
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
      }} //Tu preverjaš, ali je searchedTasks definiran in ali ima dolžino večjo od 0, preden začneš uporabljati map. To prepreči napako, če je searchedTasks undefined ali prazna tabela.
    >
      {searchedTasks && searchedTasks.length > 0 ? (
        searchedTasks.map((task, index) => (
          <TaskItem
            key={task.id || index}
            task={task}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            saveTask={saveTask}
            isEditing={isEditing}
            setEditedTask={setEditedTask}
            editedTask={editedTask}
          />
        ))
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>No tasks found</p>
      )}
    </VStack>
  );
};

export default TaskList;
