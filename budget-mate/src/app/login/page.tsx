'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('access', data.access);
      router.push('/dashboard');
    } else {
      alert('Nieprawidłowe dane logowania');
    }
  };

  const handleRegister = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    });

    if (res.ok) {
      alert('✅ Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      setShowRegister(false);
    } else {
      alert('❌ Błąd rejestracji. Spróbuj ponownie.');
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Lewy gradientowy panel */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white px-16">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to BudgetMate</h1>
            <p className="text-lg">
              Planowanie budżetu nigdy nie było łatwiejsze. Zaloguj się i zacznij śledzić swoje finanse.
            </p>
          </div>
        </div>

        {/* Prawy panel logowania */}
        <div className="w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">User Login</h2>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
              <label><input type="checkbox" className="mr-1" /> Remember me</label>
              <button onClick={() => setShowRegister(true)} className="hover:underline text-pink-500">Zarejestruj się</button>
            </div>
            <button
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded hover:opacity-90 transition"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>

      {/* Modal rejestracji */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Rejestracja</h2>
            <input
              type="text"
              placeholder="Nazwa użytkownika"
              className="input mb-3"
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input mb-3"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Hasło"
              className="input mb-4"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="btn bg-gray-300 text-black" onClick={() => setShowRegister(false)}>Anuluj</button>
              <button className="btn bg-purple-500 text-white" onClick={handleRegister}>Zarejestruj się</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
