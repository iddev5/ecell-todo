import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const statuses = [
  "open",
  "closed",
  "in progress",
  "not an issue",
  "help wanted",
]

export default function StatusDropdown({
  status,
  onChange,
}: {
  status: string
  onChange: (value: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="uppercase">
          {status}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {statuses.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() => onChange(s)}
            className="uppercase"
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
