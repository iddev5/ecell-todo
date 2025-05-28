
import { Input } from "../components/ui/input";

export default function Header() {
    return (
        <header className="w-full flex justify-center shadow-md">
            <div className="w-[40vw] flex justify-between p-4 px-8 shadow-lg">
                <p className="text-3xl font-semibold">Justflow</p>
                <Input className="w-[20vw]" placeholder="Search tasks..." />
            </div>
        </header>
    );
}