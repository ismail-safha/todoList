"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, Trash2, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./components/Spinner";

// Type definition for a task item
type Tasks = {
  id: number;
  title: string;
  done: boolean;
};

export default function Home() {
  // === State Management ===
  const [todos, setTodos] = useState<Tasks[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === Fetch all tasks ===
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTodos(data);
      setLoading(true);
    } catch (error) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // === Add a new task ===
  const addTodo = async () => {
    if (!title.trim()) return;

    setAdding(true); // Start spinner
    try {
      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: { "Content-Type": "application/json" },
      });
      setTitle("");
      fetchTodos();
    } catch (e) {
      setError("Failed to add task.");
    } finally {
      setAdding(false); // Stop spinner
    }
  };

  // === Delete a task ===
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setError(null);
      fetchTodos();
    } catch (e) {
      setError("Failed to delete task.");
    }
  };

  // === Toggle task completion ===
  const toggleDone = async (id: number, done: boolean) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !done }), // toggle value
      });
      setError(null);
      fetchTodos();
    } catch (e) {
      setError("Failed to toggle task.");
    }
  };

  // === Initial fetch on component mount ===
  useEffect(() => {
    fetchTodos();
  }, []);

  //===

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-indigo-300 p-6 flex justify-center items-start">
      <div className="w-full max-w-xl backdrop-blur-md bg-white/30 rounded-2xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 drop-shadow-md">
          Todo list
        </h1>

        {/* Input + Add Button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm bg-white/70"
          />
          <button
            onClick={addTodo}
            disabled={adding}
            className={`bg-[#8687E7] hover:bg-[#8688e79c] text-white px-6 py-2 rounded-xl shadow flex items-center justify-center gap-2 ${
              adding ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {adding ? <Spinner /> : "Add"}
          </button>
        </div>

        {/* Error message */}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        {todos.length === 0 ? (
          <div className="text-center text-gray-700">
            <Image
              src="/Checklist-rafiki 1.png"
              alt="Empty state"
              width={300}
              height={300}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-medium">
              What do you want to do today?
            </h2>
          </div>
        ) : (
          // Task list
          <ul className="space-y-3">
            <AnimatePresence>
              {todos.map((task) => (
                <motion.li
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md ${
                    task.done
                      ? "bg-green-200/60 line-through text-gray-500"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                >
                  <span
                    onClick={() => toggleDone(task.id, task.done)}
                    className="flex-1 flex items-center gap-2"
                  >
                    <CheckCircle
                      className={`w-5 h-5 shrink-0 ${
                        task.done ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    {task.title}
                  </span>
                  <div className="gap-3 ml-4">
                    <button
                      onClick={() => deleteTodo(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
