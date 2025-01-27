import React from "react";

export function time(date) {
  const taskDate = new Date(date);
  if (isNaN(taskDate)) return "Invalid Date";

  const days = taskDate.getDate().toString().padStart(2, "0");
  const months = (taskDate.getMonth() + 1).toString().padStart(2, "0");
  const years = taskDate.getFullYear();

  const hours = taskDate.getHours().toString().padStart(2, "0");
  const minutes = taskDate.getMinutes().toString().padStart(2, "0");
  const seconds = taskDate.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}, ${days}/${months}/${years}`;
}
