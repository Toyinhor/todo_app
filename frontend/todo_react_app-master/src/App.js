import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Text, Modal, TextInput, Group, Card, ActionIcon } from '@mantine/core';
import { Trash, Pencil } from 'tabler-icons-react';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import Header from './header';
import LoginModal from './LoginModal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Mantine color scheme & hotkeys
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const taskTitle = useRef(null);
  const taskSummary = useRef(null);

  const loadTasks = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/task/user/${id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem('jwt');
    
    if (!token) return;
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Gửi token vào trong body của yêu cầu POST
      const profileRes = await axios.post('http://localhost:8080/user/me', { token });
      const id = profileRes.data.id;
      setUserId(id);
      await loadTasks(id);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setLoginModalOpen(true);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchProfile();
    } else {
      setLoginModalOpen(true);
    }
  }, []);
  

  const handleLogin = (token) => {
    console.log('handleLogin gọi với token:', token); 
    localStorage.setItem('jwt', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setLoginModalOpen(false);
    fetchProfile();
  };

  const createTask = async () => {
    if (!userId) return;
    const newTask = {
      title: taskTitle.current.value,
      summary: taskSummary.current.value,
      status: 'in-progress',
      userId,
    };
    try {
      const response = await axios.post('http://localhost:8080/task', newTask);
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/task/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/task/${updatedTask.id}`,
        updatedTask
      );
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="App">
      <Header
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
        isAuthenticated={!!userId}
        onLogout={() => {
          localStorage.removeItem('jwt');
          setUserId(null);
          setTasks([]);
          setLoginModalOpen(true);
        }}
        onLogin={handleLogin}
      />

      <LoginModal
        opened={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <Modal
        opened={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
        centered
      >
        <TextInput
          label="Title"
          required
          mt="md"
          value={editingTask?.title || ''}
          onChange={(e) =>
            setEditingTask({ ...editingTask, title: e.target.value })
          }
        />
        <TextInput
          label="Summary"
          mt="md"
          value={editingTask?.summary || ''}
          onChange={(e) =>
            setEditingTask({ ...editingTask, summary: e.target.value })
          }
        />
        <Group position="apart" mt="md">
          <Button variant="subtle" onClick={() => setEditingTask(null)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateTask(editingTask);
              setEditingTask(null);
            }}
          >
            Update Task
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="New Task"
        centered
      >
        <TextInput
          label="Title"
          required
          mt="md"
          placeholder="Task Title"
          ref={taskTitle}
        />
        <TextInput
          label="Summary"
          mt="md"
          placeholder="Task Summary"
          ref={taskSummary}
        />
        <Group position="apart" mt="md">
          <Button variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              createTask();
              setOpened(false);
            }}
          >
            Create Task
          </Button>
        </Group>
      </Modal>

      <Container size={550} my={40}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card withBorder key={task.id} mt="sm">
              <Group position="apart">
                <Text weight="bold">{task.title}</Text>
                <Group spacing="xs">
                  <ActionIcon
                    color="blue"
                    variant="transparent"
                    onClick={() => setEditingTask(task)}
                  >
                    <Pencil />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    variant="transparent"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash />
                  </ActionIcon>
                </Group>
              </Group>
              <Text color="dimmed" size="md" mt="sm">
                {task.summary || 'No summary provided'}
              </Text>
            </Card>
          ))
        ) : (
          <Text size="lg" color="dimmed" mt="md">
            You have no tasks
          </Text>
        )}
        <Button fullWidth mt="md" onClick={() => setOpened(true)}>
          New Task
        </Button>
      </Container>
    </div>
  );
}

export default App;
