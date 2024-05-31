'use client'

import {
  BarChart3,
  Package,
  SquareGanttChart,
  WandSparkles,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const reports: { title: string; href: string; description: string }[] = [
  {
    title: 'Por período',
    href: '/reports/byperiod',
    description: 'Relatório do período com dados diários',
  },
  {
    title: 'Semanal',
    href: '/reports/week',
    description: 'Relatório da semana com dados diários',
  },
  {
    title: 'Mensal',
    href: '/reports/month',
    description: 'Relatório do mês com dados diários',
  },
  {
    title: 'Anual',
    href: '/reports/year',
    description: 'Relatório do ano com dados mensais',
  },
]

const products: { title: string; href: string; description: string }[] = [
  {
    title: 'Adicionar produto',
    href: '/products/add',
    description: 'Adicionar produto ao catálogo',
  },
  {
    title: 'Listar produtos',
    href: '/products',
    description: 'Listagem dos produtos cadastrados',
  },
]

export function HeaderNavigation() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <Link href="/sales" legacyBehavior passHref>
            <NavigationMenu.Link className={navigationMenuTriggerStyle()}>
              <SquareGanttChart className="size-4 text-muted-foreground/50" />
              Vendas
            </NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <Package className="size-4 text-muted-foreground/50" />
            Produtos
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="w-[20rem] space-y-1 p-4">
              {products.map((component) => (
                <NavigationMenu.ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </NavigationMenu.ListItem>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <BarChart3 className="size-4 text-muted-foreground/50" />
            Relatórios
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-[40rem] grid-cols-2 gap-1 p-4">
              {reports.map((component) => (
                <NavigationMenu.ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </NavigationMenu.ListItem>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <WandSparkles className="size-4 text-muted-foreground/50" />
            Ferramentas
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-[32rem] gap-x-3 gap-y-1 p-4 lg:grid-cols-[10rem_1fr]">
              <li className="row-span-3">
                <NavigationMenu.Link asChild>
                  <a
                    className="group flex h-full w-full flex-col justify-end rounded-md bg-muted p-6 no-underline outline-none hover:bg-primary focus:shadow-md"
                    href="https://www.ideahome.com.br/admin"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium group-hover:text-primary-foreground">
                      Idea Home
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground group-hover:text-primary-foreground">
                      Acesse o painel administrativo da loja online.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <NavigationMenu.ListItem href="/import" title="Importar dados">
                Importar registros de produtos ou vendas
              </NavigationMenu.ListItem>
              <NavigationMenu.ListItem href="/export" title="Exportar vendas">
                Exportar todos os registros de vendas
              </NavigationMenu.ListItem>
              <NavigationMenu.ListItem href="/about" title="Sobre">
                Informações sobre a aplicação
              </NavigationMenu.ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
