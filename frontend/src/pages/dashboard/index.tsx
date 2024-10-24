import { Layout } from '@/components/custom/layout';
import { getToken } from "@/utils/authHelper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search } from '@/components/search-menu';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { RecentTasks } from './components/recent-tasks';
import { BarChartCategory } from './components/bar-chart';
import { PieChartStatus } from './components/pie-chart';
import { BarChartTimeline } from './components/bar-char-timeline';
import DashboardCard from './components/DashboardCard';
import { useEffect, useState } from 'react';
import api from '@/utils/api';

interface StatusData {
  status: string;
  count: number;
  percentage: string;
}

export default function Dashboard() {
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const token = getToken(); 

  if (!token) {
    console.error("Token não encontrado!");
    return null; 
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/tasksByStatus', {
          headers: {
            Authorization: token,
          },
        });
        setStatusData(response.data);
      } catch (error) {
        console.error('Error fetching tasks by status:', error);
      }
    };

    fetchData();
  }, [token]); 

  const filteredStatusData = statusData.filter(item => item.status !== "");

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-7 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {statusData.map((item, index) => (
                <DashboardCard
                  key={index} 
                  title={`Tarefas ${item.status}`}
                  value={item.count.toString()} 
                  description={`Equivale a ${item.percentage}% das tarefas totais.`} 
                  icon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M4 22V2a2 2 0 0 1 2-2h8l6 6v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z' />
                      <polyline points='14 2 14 8 20 8' />
                    </svg>
                  }
                />
              ))}
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <BarChartCategory />
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Tarefas concluídas nos últimos 7 dias.</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentTasks />
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-2'>
                <PieChartStatus statusData={filteredStatusData} /> 
              </Card>
              <Card className='col-span-1 lg:col-span-5'>
                <BarChartTimeline />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
}
