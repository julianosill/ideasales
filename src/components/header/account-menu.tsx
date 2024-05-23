'use client'

import { ChevronDown, LogOut, UserCog } from 'lucide-react'

import { Button } from '../ui/button'
import { DropdownMenu } from '../ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          Juliano
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Label className="flex flex-col gap-0.5">
          <span>Juliano Sill</span>
          <span className="font-normal">juliano@ideasales.com.br</span>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <DropdownMenu.Button>
            <UserCog className="size-4" />
            Editar perfil
          </DropdownMenu.Button>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <DropdownMenu.Button>
            <LogOut className="size-4" />
            Sair
          </DropdownMenu.Button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
