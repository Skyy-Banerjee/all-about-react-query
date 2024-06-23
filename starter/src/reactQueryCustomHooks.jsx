import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

//! fetching/READ 📃
export function useFetchTasks() {
    const { isLoading, data, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await customFetch.get('/')
            return data;
        },
    });

    return { isLoading, data, isError }
}

//! add/CREATE ⚙️
export function useCreateTask() {
    const queryClient = useQueryClient();

    const { mutate: createTask, isLoading: createTaskLoading } = useMutation({
        mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task added ✅');
            //('');
        },
        onError: (error) => {
            //alert(error + '!⚠️')
            toast.error(error.response.data.msg)
        },
    });
    return {createTask, createTaskLoading};
}

//! edit/UPDATE 📝
export function useEditTask() {
    const queryClient = useQueryClient();

    const { mutate: editTask } = useMutation({
        mutationFn: ({ taskId, isDone }) => {
            return customFetch.patch(`/${taskId}`, { isDone });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (error) => {
            //alert(error + '!⚠️')
            toast.error(error.response.data.msg)
        },
    });
    return { editTask };
}

//! remove/DELETE 🗑️
export function useDeleteTask() {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
        mutationFn: (taskId) => {
            return customFetch.delete(`/${taskId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (error) => {
            //alert(error + '!⚠️')
            toast.error(error.response.data.msg)
        },
    });
    return { deleteTask, deleteTaskLoading };
}