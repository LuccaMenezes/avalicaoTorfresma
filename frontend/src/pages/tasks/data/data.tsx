import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'Pendente',
    label: 'Pendente',
    icon: QuestionMarkCircledIcon,
  },

  {
    value: 'Em andamento',
    label: 'Em andamento',
    icon: StopwatchIcon,
  },
  {
    value: 'Concluída',
    label: 'Concluída',
    icon: CheckCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Faculdade',
    value: 'Faculdade',
  },
  {
    label: 'Desenvolvimento',
    value: 'Desenvolvimento',
  },
  {
    label: 'High',
    value: 'high',
  },
]
