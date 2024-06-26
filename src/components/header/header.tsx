import Link from 'next/link'

import { Logo } from '../logo'
import { ThemeToggle } from '../theme/toogle'
import { AccountMenu } from './account-menu'
import { HeaderNavigation } from './navigation'

export function Header() {
  return (
    <header className="flex items-center gap-3 border-b pb-4 pt-8">
      <Link
        href="/"
        className="mr-4 ring-offset-background transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        <Logo className="h-4 w-auto fill-primary" />
      </Link>

      <HeaderNavigation />

      <ThemeToggle />
      <AccountMenu />
    </header>
  )
}
