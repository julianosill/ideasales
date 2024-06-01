import { Link } from './ui/link'

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-2 border-t pb-6 pt-4 text-sm text-muted-foreground">
      <div>
        <span className="font-medium">Idea Sales</span> - Relatório de vendas da
        loja <Link href="https://www.ideahome.com.br">Idea Home</Link>
      </div>
      <span>
        Desenvolvido por{' '}
        <Link href="https://julianosill.com.br">Juliano Sill</Link>
      </span>
    </footer>
  )
}
