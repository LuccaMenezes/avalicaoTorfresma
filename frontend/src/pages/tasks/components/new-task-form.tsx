import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getToken } from "@/utils/authHelper";
import { Separator } from "@/components/ui/separator";
import { toast } from '@/components/ui/use-toast'
import 'react-toastify/dist/ReactToastify.css';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/utils/api";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Informe o título da tarefa.",
    })
    .min(3, "O título da tarefa deve ter no mínimo 3 caracteres.")
    .max(255, "O título da tarefa deve ter no máximo 255 caracteres."),
  description: z
    .string({
      required_error: "Precisamos da data de nascimento do cliente",
    })
    .min(3, "A descrição da tarefa deve ter no mínimo 3 caracteres.")
    .max(255, "A descrição da tarefa deve ter no máximo 255 caracteres."),
  status: z
    .string({
      required_error: "Informe o status da tarefa",
    }).nullable(),
  categoryId: z
    .number({
      required_error: "Informe a categoria da tarefa",
    }),
  creationDate: z
    .string({
      required_error: "Informe a data de criação da tarefa",
    }),
  completionDate: z.string().optional(),
});

export function NewTaskForm({
  task,
  modoVisualizacao = false,
  modoEdicao = false,
}: {
  task: any;
  modoVisualizacao?: boolean;
  modoEdicao?: boolean;
}) {
  const { id } = useParams();
  const token = getToken();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: task
  });

  const formatDateInput = (value: string | null) => {
    if (!value) {
      return "";
    }

    value = value.replace(/\D/g, "");

    if (value.length <= 2) {
      return value;
    } else if (value.length <= 4) {
      return value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length <= 8) {
      return value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4);
    }

    return value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
  };

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const statusOptions = [
    { value: "Pendente", label: "Pendente" },
    { value: "Em andamento", label: "Em andamento" },
    { value: "Concluída", label: "Concluída" },
  ];

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [taskEdit, setTaskEdit] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/api/tasks/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setTaskEdit(response.data);
      } catch (error) {
        console.error("Erro ao buscar a tarefa", error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id, token]);

  useEffect(() => {
    if (taskEdit) {
      form.reset(taskEdit);
    }
  }, [task, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const creationDate = parseDate(values.creationDate);
    const completionDate = values.completionDate ? parseDate(values.completionDate) : undefined;

    const updatedValues = {
      ...values,
      creationDate,
      completionDate,
    };

    const token = getToken();
    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

    if (!modoVisualizacao && !modoEdicao) {
      try {
        const response = await api.post('/api/tasks', updatedValues, {
          headers: {
            Authorization: token,
          },
        });

        navigate('/tasks', {
          state: { message: "Tarefa cadastrada com sucesso!" },
        });

      } catch (error) {
        console.error("Erro ao enviar os dados", error);
      }
    } else if (modoEdicao) {
      try {
        const response = await api.put(`/api/tasks/${id}`, updatedValues, {
          headers: {
            Authorization: token,
          },
        });
        navigate('/tasks', {
          state: { message: "Tarefa alterada com sucesso!" },
        });
      } catch (error) {
        toast({ description: 'erro' })
      }
    }
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (taskEdit) {
      const formattedTask = {
        ...taskEdit,
        creationDate: formatDate(taskEdit.creationDate),
        completionDate: taskEdit.completionDate ? formatDate(taskEdit.completionDate) : "",
      };
      form.reset(formattedTask);
    }
  }, [taskEdit, form]);

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 grid">
          <Card className="h-full w-full justify-start p-5 overflow-auto">
            <CardContent className="space-y-8 pt-0">
              <b className="font-semibold">Informações da Tarefa</b>
              <Separator className="mt-5 mb-5" />
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-2">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={modoVisualizacao} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-1">
                      <FormLabel>Categoria</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? categories?.find((c) => c.id === field.value)?.name
                                : "Selecione a Categoria"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Buscar Categorias..." className="h-9" />
                            <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                            <CommandGroup>
                              {categories?.map((category) => (
                                <CommandItem
                                  key={category.id}
                                  value={category.name}
                                  onSelect={(value) => {
                                    form.setValue("categoryId", category.id);
                                  }}
                                >
                                  {category.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creationDate"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-1">
                      <FormLabel>Data de Criação</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ? formatDateInput(field.value) : ""}
                          onChange={(e) => field.onChange(formatDateInput(e.target.value))}
                          placeholder="DD/MM/YYYY"
                          disabled={modoVisualizacao}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="completionDate"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-1">
                      <FormLabel>Data de Conclusão</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ? formatDateInput(field.value) : ""}
                          onChange={(e) => field.onChange(formatDateInput(e.target.value))}
                          placeholder="DD/MM/YYYY"
                          disabled={modoVisualizacao}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-1">
                      <FormLabel>Status</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? statusOptions.find((option) => option.value === field.value)
                                  ?.label
                                : "Selecione o Status"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Buscar status..." />
                            <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
                            <CommandGroup>
                              {statusOptions.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  onSelect={() => form.setValue("status", option.value)}
                                >
                                  {option.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      option.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea  {...field} disabled={modoVisualizacao} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,1fr,2fr,2fr] gap-4">
              </div>
            </CardContent>
            <CardContent className="space-y-8">
              <Separator className="mt-5 mb-5" />
              <div className="flex justify-end">
                <Button
                  variant={modoVisualizacao ? "default" : "outline"}
                  type="button"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                {!modoVisualizacao && (
                  <Button type="submit" variant="default" className="ml-4">
                    <CheckIcon className="mr-2 w-4 h-4" />
                    Cadastrar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
