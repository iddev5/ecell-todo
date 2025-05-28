import { useState } from "react";
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

const editFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().optional(),
});

function EditForm(props: {title: string, desc: string}) {
  // const form = useForm({
  //   resolver: zodResolver(editFormSchema),
  //   defaultValue: {
  //     title: props.title ||'',
  //     desc: props.desc || ''
  //   }
  // })

  const [titleProp, setTitleProp] = useState(props.title);
  const [descProp, setDescProp] = useState(props.desc);

  const onSubmit = (data: z.infer<typeof editFormSchema>) => {
    console.log(data);
  }

  const onOpenChange = (open: boolean) => {
    if (!open)
      onSubmit({ title: titleProp, desc: descProp });
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="flex-1 text-left">
        <div>
          <h3 className="text-lg font-semibold">{props.title}</h3>
          <p className="text-gray-600">{props.desc}</p>
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

function Todo(props: { title: string; desc: string, completed: boolean }) {
  return (
    <div className="m-2 my-1 p-4 flex justify-between items-center rounded-lg border-1 border-gray-200">
      <div className="flex items-center flex-1">
        <Button variant="ghost" className="rounded-full">
          {props.completed &&
            <Circle />
          }
          {!props.completed &&
            <CircleCheckBig />
          }
        </Button>
        <EditForm title={props.title} desc={props.desc} />
      </div>
      <Button variant="ghost" className="rounded-full">
        <Trash2 />
      </Button>
    </div>
  );
}

const actionFormSchema = z.object({
  title: z.string().min(1, "Title is required")
})

function ActionBar() {
  const form = useForm({
    resolver: zodResolver(actionFormSchema),
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = (data: z.infer<typeof actionFormSchema>) => {
    console.log(data);
    form.reset()
  }

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-[40vw] fixed bottom-0 shadow-lg bg-white border-t-1 border-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-1 p-2 px-4">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Add title..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">
              <ArrowRight />
            </Button>
            <Button variant="secondary">
              <Mic />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function App() {
  return <>
    <Header />
    <section className="w-full flex justify-center">
      <div className="w-[40vw] min-h-screen h-full pb-26 shadow-lg">
        <Tabs defaultValue="all">
          <Options />
          <TabsContent value="all">
            <div className="flex flex-col gap-1">
              {
                Array.from({ length: 10 }).map((_, index) => (
                  <Todo
                    key={index}
                    title={`Task ${index + 1}`}
                    desc={`Description for task ${index + 1}`}
                    completed={index % 2 === 0}
                  />
                ))
              }
            </div>
          </TabsContent>
          <TabsContent value="done">Change your password here.</TabsContent>
          <TabsContent value="inprog">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </section>
    <ActionBar />
  </>
}