
import { Switch } from "@/components/ui/switch";
import { Input } from "../components/ui/input";
import { useTheme } from '@/components/theme-provider';
import { Moon, Search, Sun } from 'lucide-react';

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
                    <div className="relative">
                        <Input className="w-[20vw]" placeholder="Search tasks..." />
                        <Search className="absolute top-1/2 -translate-y-1/2 right-2 border-1 rounded-md p-1 opacity-80" />
                    </div>
                    <Switch onCheckedChange={changeTheme} />
                    {theme === 'light' && <Sun />}
                    {theme === 'dark' && <Moon />}
                </div>
            </div>
        </header>
    );
}