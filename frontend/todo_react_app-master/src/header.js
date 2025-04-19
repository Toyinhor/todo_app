import React, { useState } from 'react';
import { Button, Group, Title, ActionIcon } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

/**
 * Props:
 * - colorScheme: 'light' | 'dark'
 * - toggleColorScheme: () => void
 * - isAuthenticated: boolean
 * - onLogout: () => void
 */
export default function Header({ colorScheme, toggleColorScheme, isAuthenticated, onLogout, onLogin }) {
  const [registerOpened, setRegisterOpened] = useState(false);
  const [loginOpened, setLoginOpened] = useState(false);

  const handleRegister = ({ username, email, password }) => {
    console.log('Registering:', username, email, password);
    // TODO: call API register and update auth state
  };

  const handleLogin = (token) => {
    console.log('Logged in, token:', token);
    setLoginOpened(false);
    // TODO: set auth token in state/storage and update auth state
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#f1f3f5',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <Title order={2}>📝 My Tasks</Title>
        <Group spacing="md">
          {!isAuthenticated ? (
            <Button variant="outline" onClick={() => setLoginOpened(true)}>
              Login
            </Button>
          ) : (
            <Button variant="outline" color="red" onClick={onLogout}>
              Logout
            </Button>
          )}

          {!isAuthenticated && (
            <Button variant="outline" size="sm" onClick={() => setRegisterOpened(true)}>
              Register
            </Button>
          )}

          <ActionIcon
            onClick={toggleColorScheme}
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            size="lg"
          >
            {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
        </Group>
      </header>

      {/* Register Modal */}
      <RegisterModal
        opened={registerOpened}
        onClose={() => setRegisterOpened(false)}
        onRegister={handleRegister}
      />

      {/* Login Modal */}
      <LoginModal
        opened={loginOpened}
        onClose={() => setLoginOpened(false)}
        onLogin={(token) => {
            handleLogin(token); 
            onLogin(token);     
          }}
      />
    </>
  );
}
