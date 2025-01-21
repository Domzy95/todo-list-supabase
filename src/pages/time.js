import React, { useState, useEffect } from "react";

export function time(timeCreated) {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timeCreated) / 1000);

  if (diffInSeconds < 60) {
    return "";
  }
  if (diffInSeconds < 3600) {
    return `Added ${Math.floor(diffInSeconds / 60)} minutes ago`;
  }
  if (diffInSeconds < 86400) {
    return `Added ${Math.floor(diffInSeconds / 3600)} hours ago`;
  }
  if (diffInSeconds < 604800) {
    return `Added ${Math.floor(diffInSeconds / 86400)} days ago`;
  }
}
