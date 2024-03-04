import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { TestWs } from "./components/TestWs";

export default function App() {
  return <TestWs></TestWs>;
}
