import './globals.css';

export const metadata = {
  title: 'Meu Projeto Next.js',
  description: 'Teste prático Next.js com App Router, Tailwind, Auth e Middleware',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        {/* Conteúdo principal */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer com crédito */}
        <footer className="bg-gray-100 text-gray-600 text-center py-4">
          Desenvolvido por <strong>Alipio N. da Silva</strong>
        </footer>
      </body>
    </html>
  );
}
