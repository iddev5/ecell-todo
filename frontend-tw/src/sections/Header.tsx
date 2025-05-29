
import { Switch } from "@/components/ui/switch";
import { Input } from "../components/ui/input";
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
    const { theme, setTheme } = useTheme();

    const changeTheme = (b: boolean) => {
        setTheme(b ? 'dark' : 'light');
    }

    return (
        <header className="w-full flex justify-center shadow-md">
            <div className="w-[40vw] flex justify-between p-4 px-8 shadow-lg">
                <p className="text-3xl font-semibold">Justflow</p>
                <div className="flex items-center gap-2">
                    <Input className="w-[20vw]" placeholder="Search tasks..." />
                    <Switch onCheckedChange={changeTheme} />
                    {theme === 'light' && <Sun />}
                    {theme === 'dark' && <Moon />}
                </div>
            </div>
        </header>
    );
}