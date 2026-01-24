import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector, type RootState } from "../lib/store";
import { Form, FormItem, FormControl, FormField } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Circle, CircleCheckBig, Trash2, ArrowRight, Mic } from "lucide-react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from "../lib/api";

const actionFormSchema = z.object({
  title: z.string().min(1, "Title is required")
})

export default function ActionBar() {
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(actionFormSchema),
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = (data: z.infer<typeof actionFormSchema>) => {
    dispatch(api.createTodo(data.title, ''));
    form.reset()
  }

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-[95vw] md:w-[40vw] fixed bottom-0 shadow-lg bg-white border-t-1 border-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-1 p-2 px-2 md:px-4">
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
          </form>
        </Form>
      </div>
    </div>
  );
}
