import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const formSchema = z.object({
  task: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTaskForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  const utils = api.useUtils();

  const createTaskMutation = api.task.createTask.useMutation({
    async onSuccess(data) {
      console.log(data);
      await utils.task.list.invalidate();
      toast.success("Task Added!");
      form.reset();
    },
  });

  function onSubmit(values: FormValues) {
    createTaskMutation.mutate({
      task: values.task,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Task</CardTitle>
            <CardDescription>Add new task.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="task"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task (Text)</FormLabel>
                      <FormControl>
                        <Input placeholder="text task" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="secondary"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              type="submit"
              disabled={createTaskMutation.isPending}
            >
              {createTaskMutation.isPending ? "loading..." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
