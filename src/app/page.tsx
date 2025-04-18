import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full space-y-8">
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold text-indigo-800">
            Bem-vindo ao Teste Next.js!
          </h1>
          <p className="text-indigo-600">
            Explore as funcionalidades desta aplicação.
          </p>
        </div>

        {/* Botões de navegação */}
        <div className="space-y-4">
          <Link
            href="/users"
            className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-transform transform hover:scale-105"
          >
            👥 Ver usuários
          </Link>
          <Link
            href="/posts/1"
            className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-transform transform hover:scale-105"
          >
            📝 Ver post #1
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow transition-transform transform hover:scale-105"
          >
            🔒 Login
          </Link>
        </div>
      </div>
    </main>
  );
}
