// src/app/posts/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface PostSummary {
  id: number;
  title: string;
}

interface PostDetail {
  title: string;
  body: string;
}

export default function PostSelectorPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id; // string

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega lista de posts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(res => res.json())
      .then((data: PostSummary[]) => {
        setPosts(data);
      })
      .catch(() => {
        setError('Não foi possível carregar a lista de posts.');
      })
      .finally(() => {
        setLoadingList(false);
      });
  }, []);

  // Quando muda o id na rota, busca o detalhe
  useEffect(() => {
    const id = idParam ? Number(idParam) : null;
    if (!id) {
      setPost(null);
      return;
    }
    setLoadingPost(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: PostDetail) => {
        setPost(data);
        setError(null);
      })
      .catch(() => {
        setError(`Post #${id} não encontrado.`);
        setPost(null);
      })
      .finally(() => {
        setLoadingPost(false);
      });
  }, [idParam]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-indigo-600 text-3xl">📑</span>
            <h1 className="text-2xl font-bold text-gray-900">Seleção de Posts</h1>
          </div>
          {/* Botão Início estilizado */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-shadow shadow-sm"
          >
            ← Início
          </Link>
        </header>

        {/* Conteúdo */}
        <section className="p-8 space-y-8">
          {/* Dropdown de seleção */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Escolha um post
            </h2>
            {loadingList ? (
              <p className="text-gray-600">Carregando lista…</p>
            ) : error && posts.length === 0 ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="relative">
                <select
                  value={idParam ?? ''}
                  onChange={e => {
                    const newId = e.target.value;
                    router.push(`/posts/${newId}`);
                  }}
                  className="
                    w-full 
                    px-5 py-3 
                    appearance-none 
                    border border-gray-300 
                    rounded-xl 
                    bg-white 
                    text-gray-800 
                    text-sm 
                    focus:outline-none 
                    focus:ring-2 focus:ring-indigo-400 
                    focus:border-indigo-400 
                    shadow-sm 
                    transition
                  "
                >
                  <option value="" disabled className="text-gray-400">
                    -- Selecione um post --
                  </option>
                  {posts.map(p => (
                    <option key={p.id} value={p.id}>
                      #{p.id} –{' '}
                      {p.title.length > 50
                        ? p.title.slice(0, 50) + '…'
                        : p.title}
                    </option>
                  ))}
                </select>
                {/* Seta customizada */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Detalhe do post */}
          {idParam && (
            <div>
              {loadingPost ? (
                <p className="text-gray-600">Carregando post #{idParam}…</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : post ? (
                <article className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {post.body}
                  </p>
                </article>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
