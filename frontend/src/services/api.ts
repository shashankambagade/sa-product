import axios from 'axios';
import { ReportPayload } from '../types/report';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
});

export async function fetchProjectReport(projectId: string, token: string) {
  const { data } = await api.get<ReportPayload>(`/reports/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}
