import React, { useState } from 'react';
import { Modal, TextInput, PasswordInput, Group, Button } from '@mantine/core';
import axios from 'axios';

/**
 * Props:
 * - opened: boolean
 * - onClose: () => void
 * - onRegister: ({ username, email, password }) => void
 */
export default function RegisterModal({ opened, onClose, onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      // Gửi request đến API đăng ký
      const response = await axios.post('http://localhost:8080/user/register', {
        username,
        email,
        password,
      });

      // Nếu thành công, gọi onRegister và đóng modal
      onRegister({ username, email, password });
      setUsername('');
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      // Xử lý lỗi nếu có
      setError('Something went wrong, please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Register" centered>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TextInput
        label="Username"
        placeholder="Enter username"
        required
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <TextInput
        label="Email"
        placeholder="Enter email"
        required
        mt="sm"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter password"
        required
        mt="sm"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Group position="right" mt="md">
        <Button onClick={handleSubmit} loading={loading}>
          Submit
        </Button>
      </Group>
    </Modal>
  );
}
