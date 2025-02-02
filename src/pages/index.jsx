import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import FilterTask from "./FilterTask";
import TaskList from "./TaskList";
import { Box, Heading, Flex } from "@chakra-ui/react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState("null");
  const [editedTask, setEditedTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Dodaj nalogo v seznam nalog, če vnos ni prazen. To preprečuje dodajanje praznih nalog.
  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { text: task, completed: false, timeCreated: new Date().toISOString() },
      ]);
      setTask("");
    }
  };
  // Nastavi stanje za urejanje naloge: shrani indeks naloge in njeno besedilo,
  // da omogoči prikaz vnosnega polja za urejanje.
  const startEditing = (index) => {
    setIsEditing(index);
    setEditedTask(tasks[index].text); // Nastavi trenutno besedilo naloge
  };
  // Posodobi besedilo naloge na določenem indeksu in končaj urejanje.
  // Po končanem urejanju se izklopi način urejanja in izprazni besedilo.
  const saveTask = (index) => {
    if (editedTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((t, i) => (i === index ? { ...t, text: editedTask } : t))
    );
    setIsEditing("null");
    setEditedTask("");
  };

  // Preklopi stanje naloge med opravljeno in neopravljeno.
  // Posodobi seznam nalog tako, da se ustrezno spremeni status 'completed'.
  const toggleTask = (index) => {
    window.confirm(
      "Are you sure you want to mark this task as completed? After that, you won't be able to edit it anymore."
    );
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Odstrani nalogo iz seznama na določenem indeksu.
  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?"))
      setTasks(tasks.filter((_, i) => i !== index));
  };
  // Ob zagonu aplikacije preberi shranjene naloge iz `localStorage`,
  // če naloge niso shranjene, inicializiraj seznam kot prazen.
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    // zagotovi da je savedtask array
    const parsedTasks = Array.isArray(savedTasks)
      ? savedTasks.map((task) => ({
          ...task,
          timeCreated: new Date(task.timeCreated),
        }))
      : [];
    setTasks(parsedTasks);
  }, []);
  // Ob vsaki spremembi nalog shrani posodobljen seznam nalog v `localStorage`.
  // To omogoča, da naloge ostanejo shranjene tudi po osvežitvi strani.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Flex align="top" justify="center" minH="100vh" bg="gray.900">
      <Box p={5} maxW="500px" h="100%" w="100%">
        <Heading textStyle="5xl" color="white" mb={10} textAlign="center">
          Whats your plan for today ? 📋✅
        </Heading>
        <TaskInput
          task={task}
          setTask={setTask}
          addTask={addTask}
          search={search}
          setSearch={setSearch}
        />
        <FilterTask filter={filter} setFilter={setFilter} />
        <TaskList
          filter={filter}
          search={search}
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          saveTask={saveTask}
          startEditing={startEditing}
          isEditing={isEditing}
          setEditedTask={setEditedTask}
          editedTask={editedTask}
        />
      </Box>
    </Flex>
  );
}
