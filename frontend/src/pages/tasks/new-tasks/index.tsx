import { useState, useEffect } from 'react';
import { Layout } from '@/components/custom/layout';
import { Search } from '@/components/search-menu';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import Breadcrumb from "@/components/custom/breadcrumb";
import {NewTaskForm} from '@/pages/tasks/components/new-task-form'

export default function NewProfissionais() {
  const [tasks, setTaks] = useState([]);

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
            <h2 className='text-2xl font-bold tracking-tight mb-2'>Nova Tarefa</h2>
            <Breadcrumb items={[
              { title: "Tarefas", link: "/tasks" },
              { title: "Nova Tarefa", link: "" }
            ]} />
          </div>
         
        </div>
        <NewTaskForm task={[]}/>
      </Layout.Body>
    </Layout>
  );
}
