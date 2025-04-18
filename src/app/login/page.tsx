'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // recupera lista do localStorage (gravada em /users)
  const stored = typeof window !== 'undefined'
    ? window.localStorage.getItem('users')
    : null;
  const users = stored ? JSON.parse(stored) as Array<{ username: string; password: string }> : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = users.find(u => u.username === user && u.password === pass);
    if (match) {
      document.cookie = `token=MEU_TOKEN_SECRETO; path=/; max-age=${60 * 60 * 24}`;
      router.push('/protected');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Faça seu Login
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="user" className="block text-gray-700 mb-1">
              Usuário
            </label>
            <input
              id="user"
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="pass"
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Precisa de ajuda?{' '}
          <Link href="/users" className="text-indigo-600 hover:underline">
            Ver usuários
          </Link>
        </p>
      </div>
    </main>
  );
}
