import React, { useState } from 'react';
import { Modal, TextInput, PasswordInput, Group, Button } from '@mantine/core';
import axios from 'axios';

/**
 * Props:
 * - opened: boolean
 * - onClose: () => void
 * - onLogin: (token) => void
 */
export default function LoginModal({ opened, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      // Gửi request đăng nhập đến API
      console.log(email)
      console.log(password)

      const response = await axios.post('http://localhost:8080/user/login', {
        email,
        password,
      });
    
      // Lưu JWT vào localStorage (hoặc sessionStorage)
      const { token } = response.data; // Giả sử API trả về { token }
      localStorage.setItem('jwt', token);
      console.log(response)


      // Gọi onLogin để thực hiện các hành động khác (ví dụ: cập nhật trạng thái người dùng)
      onLogin(token);
      
      // Reset form và đóng modal
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      setError('Invalid credentials or something went wrong.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Login" centered>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TextInput
        label="Email"
        placeholder="Enter email"
        required
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
          Login
        </Button>
      </Group>
    </Modal>
  );
}
