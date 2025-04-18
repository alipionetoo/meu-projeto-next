'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type AppUser = {
  username: string;
  password: string;
  first: string;
  last: string;
  thumbnail: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=9')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const formatted: AppUser[] = data.results.map((u: any) => ({
          username: u.login.username,
          password: u.login.password,
          first: u.name.first,
          last: u.name.last,
          thumbnail: u.picture.thumbnail,
        }));
        setUsers(formatted);
        window.localStorage.setItem('users', JSON.stringify(formatted));
      })
      .catch(err => {
        console.error('Erro ao buscar usuários:', err);
        setError('Não foi possível carregar os usuários.');
      })
      .finally(() => setLoading(false));
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`"${text}" copiado para área de transferência!`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Carregando usuários…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho com botão de login */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Lista de Usuários</h1>
          <Link
            href="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Fazer Login
          </Link>
        </div>

        {/* Grid de usuários */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {users.map((u, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              {/* Foto e nome */}
              <div className="flex items-center space-x-4">
                <img
                  src={u.thumbnail}
                  alt={`${u.first} ${u.last}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {u.first} {u.last}
                  </p>
                </div>
              </div>

              {/* Usuário e senha legíveis */}
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Usuário:</span>{' '}
                  @{u.username}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Senha:</span>{' '}
                  {u.password}
                </p>
              </div>

              {/* Botões de copiar */}
              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => copyToClipboard(u.username)}
                  className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                  Copiar usuário
                </button>
                <button
                  onClick={() => copyToClipboard(u.password)}
                  className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                  Copiar senha
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
