//*TOOGLETASK BREZ SUPABASE
// const toggleTask = (taskId) => {
//   const confirmToggle = window.confirm(
//     "Are you sure you want to mark this task as completed? After that, you won't be able to edit it anymore."
//   );
//   if (confirmToggle) {
//     setTasks((prevTasks) =>
//       prevTasks.map((task, i) =>
//         task.id === taskId ? { ...task, completed: !task.completed } : task
//       )
//     );
//   }
// };
//* Odstrani nalogo iz seznama na določenem indeksu brez supabase
// const deleteTask = (index) => {
//   if (window.confirm("Are you sure you want to delete this task?"))
//     setTasks(tasks.filter((_, i) => i !== index));
// };
//*USEEFFECT ZA LOCALSTORAGE BREZ SUPABASE
// Ob zagonu aplikacije preberi shranjene naloge iz `localStorage`,
// če naloge niso shranjene, inicializiraj seznam kot prazen.
// useEffect(() => {
//   const savedTasks = JSON.parse(localStorage.getItem("tasks"));
//   // zagotovi da je savedtask array da se izgnemo napaki
//   const parsedTasks = Array.isArray(savedTasks)
//     ? savedTasks.map((task) => ({
//         ...task,
//         timeCreated: new Date(task.timeCreated),
//       }))
//     : [];
//   setTasks(parsedTasks);
// }, []);
// Ob vsaki spremembi nalog shrani posodobljen seznam nalog v `localStorage`.
// To omogoča, da naloge ostanejo shranjene tudi po osvežitvi strani.
// useEffect(() => {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }, [tasks]);
//*ADDTASK BREZ SUPABASE
// const addTask = () => {
//   if (task.trim()) {
//     setTasks([
//       ...tasks,
//       {
//         id: Date.now(),
//         text: task,
//         completed: false,
//         timeCreated: new Date().toISOString(),
//       },
//     ]);
//     setTask("");
//   }
// };
//  //*brez supabase save task funkcija
//   const saveTask = (index) => {
//     if (editedTask.trim() === "") {
//       alert("Task cannot be empty!");
//       return;
//     }
//     setTasks((prevTasks) =>
//       prevTasks.map((t, i) => (i === index ? { ...t, text: editedTask } : t))
//     );
//     setIsEditing("null");
//     setEditedTask("");
//   };
