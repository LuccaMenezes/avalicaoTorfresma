import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getToken } from "@/utils/authHelper";
import api from '@/utils/api';

interface Task {
  title: string;
  description: string;
  completionDate: string;
}

export function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = getToken(); // Obtém o token

  if (!token) {
    console.error("Token não encontrado!");
    return;
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/api/recentCompletedTasks', {
          headers: {
            Authorization: token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks by status:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className='space-y-8'>
      {tasks.map((task, index) => (
        <div className='flex items-center' key={index}>
          <Avatar className='h-9 w-9'>
            <AvatarFallback>{task.title[0]}</AvatarFallback> {/* Exibe a primeira letra do título como avatar */}
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{task.title}</p>
            <p className='text-sm text-muted-foreground'>{task.description}</p>
          </div>
          <div className='ml-auto font-medium'>{task.completionDate}</div>
        </div>
      ))}
    </div>
  );
}
