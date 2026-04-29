import { makeRequest } from '@shared/services/makeRequest';
import type { Task, TaskCreate, TaskUpdate } from '../models/task.model';
import type { QueryParams } from '@shared/models/types/QueryParams.type';

function toQuery(params?: QueryParams) {
  if (!params) return '';
  
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return qs ? `?${qs}` : '';
};

export const taskApi = {
  get: (params?: QueryParams) => (
    makeRequest<Task[]>(`/tasks${toQuery(params)}`)
  ),
  // getById: (id: string) => (
  //   makeRequest<TaskDetails>(`/tasks/${id}`)
  // ),
  post: (payload: TaskCreate) => (
    makeRequest<Task>(`/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  ),
  put: (id: string, payload: TaskUpdate) => (
    makeRequest<Task>(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ),
  delete: (id: string) => (
    makeRequest<void>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  )
};
