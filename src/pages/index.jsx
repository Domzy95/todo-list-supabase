import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import FilterTask from "./FilterTask";
import TaskList from "./TaskList";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { supabase } from "../lib/supabase";
export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState("null");
  const [editedTask, setEditedTask] = useState("");
  const [filter, setFilter] = useState("all");
  // Dodaj nalogo v seznam nalog, če vnos ni prazen. To preprečuje dodajanje praznih nalog.
  //*SUPABASE ADD TASK
  const addTask = async () => {
    if (task.trim() === "") return;
    const newTask = {
      text: task,
      completed: false,
      timeCreated: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();
    if (error) {
      console.error("Error adding task:", error);
      return;
    }
    setTasks([...tasks, data[0]]);
    setTask(""); // Po dodajanju počisti vnosno polje
  };
  // Nastavi stanje za urejanje naloge: shrani indeks naloge in njeno besedilo,
  // da omogoči prikaz vnosnega polja za urejanje.
  const startEditing = (index) => {
    setIsEditing(index);
    setEditedTask(tasks[index].text); // Nastavi trenutno besedilo naloge
  };
  // Posodobi besedilo naloge na določenem indeksu in končaj urejanje.
  // Po končanem urejanju se izklopi način urejanja in izprazni besedilo.
  //*SUPABASE SAVE TASK FUNKCIJA
  const saveTask = async (taskId) => {
    if (editedTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    const { error } = await supabase
      .from("tasks")
      .update({ text: editedTask })
      .eq("id", taskId)
      .select();
    if (error) {
      console.error("Error updating task:", error);
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: editedTask } : task
      )
    );
    setIsEditing(null);
    setEditedTask("");
  };
  // Preklopi stanje naloge med opravljeno in neopravljeno.
  //Posodobi seznam nalog tako, da se ustrezno spremeni status 'completed'.
  //*TOGGLE TASK Z SUPABASE
  const toggleTask = async (taskId, currentState) => {
    const confirmToggle = window.confirm(
      "Are you sure you want to mark this task as completed? After that, you won't be able to edit it anymore."
    );
    if (confirmToggle) {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !currentState })
        .eq("id", taskId)
        .select();
      if (error) {
        console.log("Error updating task:", error);
        return;
      }
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !currentState } : task
        )
      );
    }
  };
  //*ZBRISE NALOGO IZ SUPABASE
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete task?")) return;
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.error("Error deleting task:", error);
      return;
    }
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  //*FETCHA TASKE IZ SUPABASE
  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Napaka pri pridobivanju nalog:", error);
      return;
    }
    setTasks(data); // Shrani podatke v stanje
  };
  // Kliči to funkcijo ob zagonu aplikacije (v `useEffect`)
  useEffect(() => {
    fetchTasks();
  }, []);

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
