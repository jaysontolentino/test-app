import { CreateTaskForm } from "./components/ui/create-task-form";
import { api, type RouterOutputs } from "./trpc/react";

type Task = RouterOutputs["task"]["list"][number];

function App() {
  const { data = [], isLoading } = api.task.list.useQuery();

  return (
    <div className="flex bg-slate-100 flex-col w-screen h-screen flex-1 justify-center items-center">
      <div className="flex flex-col gap-4 w-2xl">
        <h3 className="text-2xl text-center text-slate-800">Test app</h3>

        <CreateTaskForm />

        <div className="rounded w-full">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul className="flex flex-col gap-3">
              {data.map((task: Task) => (
                <li
                  key={task.id}
                  className="rounded-lg shadow border p-3 bg-gray-50 text-lg text-left text-slate-700"
                >
                  {task.task}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
