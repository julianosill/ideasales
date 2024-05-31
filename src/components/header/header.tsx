import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '../logo'
import { ThemeToggle } from '../theme/toogle'
import { Button } from '../ui/button'
import { AccountMenu } from './account-menu'
import { HeaderNavigation } from './navigation'

export function Header() {
  return (
    <header className="flex items-center gap-3 border-b pb-4 pt-8">
      <Link href="/" className="mr-4">
        <Logo className="h-4 w-auto fill-primary" />
      </Link>

      <HeaderNavigation />

      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 border-primary/25 pr-3 text-primary hover:border-accent-foreground/25"
        asChild
      >
        <Link href="/sales/add">
          <Plus className="size-3.5" />
          Adicionar venda
        </Link>
      </Button>

      <ThemeToggle />
      <AccountMenu />
    </header>
  )
}
