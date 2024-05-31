'use client'

import { Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <Sun className="size-4 rotate-0 opacity-100 transition-all duration-300 dark:rotate-90 dark:opacity-0" />
          <Moon className="absolute size-4 opacity-0 transition-all duration-300 dark:rotate-0 dark:opacity-100" />
          <span className="sr-only">Alterar tema</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        <DropdownMenu.Item asChild>
          <DropdownMenu.Button onClick={() => setTheme('light')}>
            <Sun className="size-3" />
            Claro
          </DropdownMenu.Button>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <DropdownMenu.Button onClick={() => setTheme('dark')}>
            <Moon className="size-3" />
            Escuro
          </DropdownMenu.Button>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <DropdownMenu.Button onClick={() => setTheme('system')}>
            <SunMoon className="size-3" />
            Sistema
          </DropdownMenu.Button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
