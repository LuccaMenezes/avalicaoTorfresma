import { useState, useEffect } from 'react';
import { Layout } from '@/components/custom/layout';
import { Search } from '@/components/search-menu';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import Breadcrumb from "@/components/custom/breadcrumb";
import { NewTaskForm } from '@/pages/tasks/components/new-task-form'
import { useParams } from "react-router-dom";
import api from '@/utils/api';
import { getToken } from "@/utils/authHelper";

interface Task {
  title: string;
  createDate: Date;
  completedDate: Date;
  description: string;
  status: string;
  category: string;
}

export default function EditTask() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task | null>(null);
  const token = getToken();

  if (!token) {
    console.error("Token não encontrado!");
    return;
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get(`api/tasks/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas", error);
      }
    }

    fetchTasks();
  }, [id]);

  return (
    <Layout>
      <Layout.Header >
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight mb-2'>Editar Tarefa</h2>
            <Breadcrumb items={[
              { title: "Tarefas", link: "/tasks" },
              { title: "Editar Tarefa", link: "" }
            ]} />
          </div>

        </div>
        <NewTaskForm task={tasks} modoEdicao={true}/>
      </Layout.Body>
    </Layout>
  );
}
