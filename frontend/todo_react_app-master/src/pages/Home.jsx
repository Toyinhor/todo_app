import React, { useState, useEffect } from "react";
import { Container, Text, Button } from "@mantine/core";
import useAuth from "../hooks/useAuth";
import * as taskApi from "../api/taskApi";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    if (user) taskApi.getTasks(user.id).then(res => setTasks(res.data));
  }, [user]);

  user.id = 1;

  const reload = () => taskApi.getTasks(user.id).then(res => setTasks(res.data));

  return (
    <Container size={550} my={40}>
      {tasks.length ? tasks.map(t => <TaskCard key={t.id} task={t} onEdit={setEditTask} onDelete={(id)=>taskApi.deleteTask(id).then(reload)} />)
        : <Text color="dimmed" size="lg">No tasks yet</Text>}
      <Button fullWidth mt="md" onClick={()=>{setEditTask(null); setFormOpen(true);}}>New Task</Button>
      <TaskForm opened={formOpen || !!editTask} initial={editTask} onClose={()=>{setFormOpen(false); setEditTask(null);}} onSubmit={(data)=>{
        const fn = data.id ? taskApi.updateTask : taskApi.createTask;
        fn(data).then(reload);
      }}/>
    </Container>
  );
}