import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "./lib/store";
import type { Todo as TodoType } from "./features/todoSlice";
import Header from "./sections/Header";
import Options from "./sections/Options";
import { Tabs, TabsContent } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Circle, CircleCheckBig, Trash2, ArrowRight, Mic } from "lucide-react";
import { Form, FormItem, FormControl, FormField } from "./components/ui/form";
import { Input } from "./components/ui/input";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "./components/ui/textarea";
import api from "./lib/api";
import StatusDropdown from "./components/StatusDropdown"
import ActionBar from "./components/ActionBar"
import { useAuth } from "@/components/auth-provider";

const editFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().optional(),
});

function EditForm(props: {id: string, title: string, desc: string}) {
  const dispatch = useAppDispatch();

  // TODO: validation
  const [titleProp, setTitleProp] = useState(props.title);
  const [descProp, setDescProp] = useState(props.desc);

  const onSubmit = (data: z.infer<typeof editFormSchema>) => {
    if (data.title !== props.title || data.desc !== props.desc)
      dispatch(api.updateTodo(props.id, {
        title: data.title,
        desc: data.desc || '',
      }));
  }

  const onOpenChange = (open: boolean) => {
    if (!open)
      onSubmit({ title: titleProp, desc: descProp });
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="flex-1 text-left max-w-[30vw]">
        <div>
          <h3 className="text-lg font-semibold truncate">{props.title}</h3>
          <p className="text-gray-600 truncate">{props.desc}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form>
            <DialogTitle className="border-b-1 border-gray-200">
              <Input
                className="mt-5 text-3xl border-none focus:ring-0 focus:border-none focus-visible:ring-0"
                onChange={(e) => setTitleProp(e.target.value)}
                value={titleProp}
              />
            </DialogTitle>
            <DialogDescription>
              <Textarea
                className="mt-5 h-[70vh] border-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-none"
                onChange={(e) => setDescProp(e.target.value)}
                value={descProp}
              />
            </DialogDescription>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

function Todo(props: { hash: number, id: string, title: string; desc: string, status: string, updatedAt: string }) {
  const dispatch = useAppDispatch();

  const onComplete = () => {
    dispatch(api.markCompleted(props.id, !props.completed));
  };

  const onSetStatus = (value: string) => {
    dispatch(api.setStatus(props.id, value));
  }

  const onDelete = () => {
    dispatch(api.deleteTodo(props.id));
  }

  return (
    <div className="m-2 my-1 p-4 flex justify-between items-center rounded-lg border-1 border-gray-200">
      <div className="flex items-center flex-1 gap-2">
        {/* <Button variant="ghost" onClick={onComplete} className="rounded-full">
          {!props.completed &&
            <Circle />
          }
          {props.completed &&
            <CircleCheckBig />
          }
        </Button> */}
        <p className="font-bold text-gray-500">#{props.hash}</p>
        <EditForm id={props.id} title={props.title} desc={props.desc} />
        {/* <Button variant="secondary">{props.status}</Button> */}
        <StatusDropdown status={props.status} onChange={onSetStatus} />
        <p className="font-bold text-gray-500">
          {
            new Date(props.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          }
      </p>
      </div>
      <Button variant="ghost" onClick={onDelete} className="rounded-full">
        <Trash2 />
      </Button>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const T = async () => {
      if (!loading) {
        const uid = await user.getIdToken();
        dispatch(api.getProjects(uid));
        dispatch(api.getTodos());
      }
    };
    T();
  }, [loading])

  const isClosed = (el: string) => ["closed", "not an issue"].some(status => el === status);

  return <>
    <Header />
    <section className="w-full flex justify-center overflow-hidden">
      <div className="w-[95vw] md:w-[40vw] min-h-screen h-full pb-26 shadow-lg">
        <Tabs defaultValue="open">
          <Options />
          {[
            ["open", (todo: TodoType) => !isClosed(todo.status)],
            ["closed", (todo: TodoType) => isClosed(todo.status)],
          ].map((tab) => (
            <TabsContent value={tab[0] as string}>
              <div className="flex flex-col gap-1">
                {todos.filter(tab[1] as () => boolean).map((todo: TodoType) => (
                  <Todo
                    key={todo._id}
                    id={todo._id}
                    hash={todo.hash}
                    title={todo.title}
                    desc={todo.desc}
                    status={todo.status}
                    updatedAt={todo.updatedAt}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
    <ActionBar />
  </>
}
