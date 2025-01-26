import React from "react";

export function time(date) {
  const taskDate = new Date(date);
  const days = taskDate.getDate();
  const months = taskDate.getMonth() + 1;
  const years = taskDate.getFullYear();

  const hours = taskDate.getHours();
  const minutes = taskDate.getMinutes();
  const seconds = taskDate.getSeconds();
  return `${hours}:${minutes}, ${days}/${months}/${years} `;
}
