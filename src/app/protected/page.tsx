// src/app/protected/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  title: string;
  extract: string;
  thumbnail: string | null;
  content_url: string;
}

export default function ProtectedPage() {
  const [time, setTime] = useState('');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // atualiza relógio
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const timer = setInterval(tick, 1000);

    // busca artigo inicial
    fetchArticle();

    return () => clearInterval(timer);
  }, []);

  async function fetchArticle() {
    setLoading(true);
    try {
      const res = await fetch(
        'https://pt.wikipedia.org/api/rest_v1/page/random/summary',
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setArticle({
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail?.source ?? null,
        content_url: data.content_urls?.desktop?.page,
      });
    } catch (err) {
      console.error('Erro ao carregar artigo:', err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full">
        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-yellow-500 text-3xl">🔒</span>
            <h1 className="text-2xl font-bold text-gray-900">Área Protegida</h1>
          </div>
          <Link
            href="/api/logout"
            className="px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition"
          >
            Logout
          </Link>
        </header>

        {/* CONTEÚDO */}
        <section className="p-8 space-y-8">
          {/* RELÓGIO */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <p className="text-gray-700">
              Bem‑vindo de volta! Agora são{' '}
              <span className="font-semibold text-indigo-600">{time}</span>
            </p>
          </div>

          {/* NAVEGAÇÃO RÁPIDA */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Navegação Rápida
            </h2>
            <div className="flex flex-wrap gap-4">
              {[
                { href: '/', label: 'Início' },
                { href: '/users', label: 'Usuários' },
                { href: '/posts/1', label: 'Ver Post #1' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-5 py-2 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition text-gray-700 text-sm font-medium"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ARTIGO ALEATÓRIO */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📚 Artigo Aleatório (Wikipédia PT)
            </h2>

            {loading ? (
              <p className="text-gray-600">Carregando artigo…</p>
            ) : article ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4 flex flex-col md:flex-row gap-6">
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full md:w-48 h-auto rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {article.extract}
                  </p>
                  <a
                    href={article.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Ler na Wikipédia →
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Não foi possível carregar o artigo.</p>
            )}

            <button
              onClick={fetchArticle}
              className="px-6 py-2 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition text-sm"
            >
              Novo Artigo
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
