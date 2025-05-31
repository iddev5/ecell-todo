import { Switch } from "@/components/ui/switch";
import { Input } from "../components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/components/theme-provider';
import { Moon, Search, Sun } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useAuth } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";

function ProfileTrigger() {
    const { user } = useAuth();

    return (
        <Avatar>
            {user && 
                <>
                    <AvatarImage src={`https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(user?.displayName)}`} />
                    <AvatarFallback>
                    {
                        user?.displayName[0]
                    }
                    </AvatarFallback>
                </> 
            }
            {!user && 
                <AvatarFallback>
                    ?
                </AvatarFallback>
            }
        </Avatar>
    );
}

function SideBar() {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();

    const userLogOut = async () => {
        await auth.signOut();
    }

    const changeTheme = (b: boolean) => {
        setTheme(b ? 'dark' : 'light');
    }

    return (
        <SheetHeader>
            <SheetTitle>{user?.displayName}</SheetTitle>
            {/* <SheetDescription>
                TODO: Mention account type probably
            </SheetDescription> */}
            <Button onClick={userLogOut}>
                Log out
            </Button>
            <SheetFooter>
                <div className="flex gap-2 items-center">
                    {theme === 'light' && <Sun />}
                    {theme === 'dark' && <Moon />}
                    <Switch onCheckedChange={changeTheme} />
                </div>
            </SheetFooter>
        </SheetHeader>
    );
}

export default function Header() {
    return (
        <header className="w-full flex justify-center shadow-md">
            <div className="w-[40vw] flex justify-between p-4 px-8 shadow-lg">
                {/* <p className="text-3xl font-semibold">Justflow</p> */}
                <Sheet>
                    <SheetTrigger><ProfileTrigger /></SheetTrigger>
                    <SheetContent side='left'>
                        <SideBar />
                    </SheetContent>
                </Sheet>
                
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Input className="w-[20vw]" placeholder="Search tasks..." />
                        <Search className="absolute top-1/2 -translate-y-1/2 right-2 border-1 rounded-md p-1 opacity-80" />
                    </div>
                </div>
            </div>
        </header>
    );
}