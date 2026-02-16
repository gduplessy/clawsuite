import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ApiIcon,
  BrainIcon,
  Clock01Icon,
  ComputerTerminal01Icon,
  File01Icon,
  GlobeIcon,
  ListViewIcon,
  ServerStack01Icon,
  Task01Icon,
} from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

type OverflowItem = {
  icon: typeof File01Icon
  label: string
  to: string
}

const SYSTEM_ITEMS: Array<OverflowItem> = [
  { icon: File01Icon, label: 'Files', to: '/files' },
  { icon: BrainIcon, label: 'Memory', to: '/memory' },
  { icon: Task01Icon, label: 'Tasks', to: '/tasks' },
  { icon: ComputerTerminal01Icon, label: 'Terminal', to: '/terminal' },
  { icon: GlobeIcon, label: 'Browser', to: '/browser' },
  { icon: Clock01Icon, label: 'Cron Jobs', to: '/cron' },
  { icon: ListViewIcon, label: 'Logs', to: '/logs' },
  { icon: ApiIcon, label: 'Debug', to: '/debug' },
]

const GATEWAY_ITEMS: Array<OverflowItem> = [
  { icon: ServerStack01Icon, label: 'Channels', to: '/channels' },
]

type Props = {
  open: boolean
  onClose: () => void
}

function OverflowGrid({
  title,
  items,
  onSelect,
}: {
  title: string
  items: Array<OverflowItem>
  onSelect: (to: string) => void
}) {
  return (
    <section>
      <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-primary-500">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button
            key={item.to}
            type="button"
            onClick={() => onSelect(item.to)}
            className={cn(
              'flex min-h-12 items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-3 py-2 text-left',
              'text-sm text-ink transition-colors hover:border-accent-200 hover:bg-accent-50 active:scale-[0.99]',
            )}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.6} />
            </span>
            <span className="truncate font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export function DashboardOverflowPanel({ open, onClose }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  function handleSelect(to: string) {
    onClose()
    void navigate({ to })
  }

  return (
    <div className="fixed inset-0 z-[80] no-swipe md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
        aria-label="Close overflow panel"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-primary-200 bg-white p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-2xl animate-in slide-in-from-bottom-4 duration-200 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 h-1.5 w-10 rounded-full bg-primary-200 dark:bg-gray-700 mx-auto" />
        <div className="space-y-4">
          <OverflowGrid title="System" items={SYSTEM_ITEMS} onSelect={handleSelect} />
          <OverflowGrid title="Gateway" items={GATEWAY_ITEMS} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  )
}
