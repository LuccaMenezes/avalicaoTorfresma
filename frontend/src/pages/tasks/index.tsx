import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search-menu'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import Breadcrumb from "@/components/custom/breadcrumb";
import api from '@/utils/api';
import { getToken } from "@/utils/authHelper";
import { toast } from '@/components/ui/use-toast'

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const token = getToken();
  const location = useLocation();

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/api/tasks', {
          headers: {
            Authorization: token,
          },
        });
        setTasks(response.data); 
      } catch (err) {
        console.log('Erro ao buscar as tarefas'); 
      }
    };

    fetchTasks(); 
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      toast({
        description: location.state.message,
      })
    }
  }, [location.state]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight mb-2'>Lista de Tarefas</h2>
            <Breadcrumb items={[{ title: "Lista de Tarefas", link: "" }]} />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
