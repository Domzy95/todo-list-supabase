import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import FilterTask from "./FilterTask";
import TaskList from "./TaskList";
import { Box, Heading, Flex, Button, HStack, VStack } from "@chakra-ui/react";
import { supabase } from "../lib/supabase";
import { FiLogOut } from "react-icons/fi";
import Auth from "./Auth";
import { Spinner } from "@chakra-ui/react";
export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  //*SUPABASE ADD TASK
  const addTask = async () => {
    if (task.trim() === "") return;
    // Pridobi trenutno prijavljenega uporabnika
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Current User:", user); // Preverimo, ali je uporabnik prijavljen
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newTask = {
      text: task,
      completed: false,
      timeCreated: new Date().toISOString(),
      user_id: user.id, // Shranimo User ID v tabelo
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();

    if (error) {
      console.error("Error adding task:", error);
      return;
    }
    // Počakamo, da se baza osveži in nato reloadamo seznam
    fetchTasks();
    setTask("");
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not logged in");
      return;
    }
    const { error } = await supabase
      .from("tasks")
      .update({ text: editedTask })
      .eq("id", taskId)
      .eq("user_id", user.id); //  Filtriramo samo naloge trenutnega uporabnika
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not logged in");
      return;
    }
    const confirmToggle = window.confirm(
      "Are you sure you want to mark this task as completed? After that, you won't be able to edit it anymore."
    );
    if (!confirmToggle) return;
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !currentState })
      .eq("id", taskId)
      .eq("user_id", user.id); // 👈 Filtriramo samo naloge trenutnega uporabnika
    if (error) {
      console.log("Error updating task:", error);
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !currentState } : task
      )
    );
  };
  //*ZBRISE NALOGO IZ SUPABASE
  const deleteTask = async (taskId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not logged in");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id); // 👈 Zagotovimo, da brišemo samo svoje naloge

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  //*FETCHA TASKE IZ SUPABASE
  const fetchTasks = async () => {
    setIsLoading(true); // Začnemo z nalaganjem
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not logged in");
      setIsLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
    setIsLoading(false); // Končamo nalaganje
  };

  //*PRIKAŽI TASKE OB REFRESHU IZ BAZE ALI OB PONOVNI ODJAVI IN PRIJAVI!
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoadingUser(false); // Ko preverimo uporabnika, končamo nalaganje
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]); // Naloge se naložijo takoj po prijavi!

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  if (isLoadingUser) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.900">
        <Spinner size="xl" color="orange.500" />
      </Flex>
    );
  }
  //!ČE USER NI PRIJAVLJEN PRIKAZE LOGIN STRAN
  if (!user) {
    return (
      <Auth
        onLogin={(user) => {
          setUser(user);
          fetchTasks(); // Takoj naloži naloge po prijavi!
        }}
      />
    );
  }

  return (
    <Flex align="top" justify="center" minH="100vh" bg="gray.900">
      <Box p={5} maxW="500px" h="100%" w="100%">
        <Box display="flex" justifyContent="flex-end" p={5}>
          <Flex alignItems="center" gap={4}>
            <Box color="white" fontSize="md">
              You are loged in as: <strong>{user.email}</strong>
            </Box>
            <Button
              onClick={handleLogout}
              size="lg"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
            >
              <FiLogOut />
              Logout
            </Button>
          </Flex>
        </Box>

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
        {/* LOADING INDIKATOR */}
        {isLoading ? (
          <Flex justify="center" align="center" my={5}>
            <Spinner size="xl" color="orange.400" />
          </Flex>
        ) : (
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
        )}
      </Box>
    </Flex>
  );
}
