import { useEffect } from 'react';
import api from "@/lib/api";
import { useAuth } from '@/components/auth-provider';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { setCurrentProject } from '@/features/projectSlice';
import { useAppDispatch, useAppSelector, type RootState } from "./lib/store";

import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();

  useEffect(() => {
    const T = async () => {
      if (!loading) {
        const uid = user.uid;
        dispatch(api.getProjects(uid));
      }
    };
    T();
  }, [loading])

  const newProject = async () => {
    navigate('/project/new');
  }

  const setProject = (proj) => {
    navigate(`/project/${proj._id}`);
  }

  return (
    <>
      <Button onClick={newProject}>
        New Project
        <Plus />
      </Button>
      <div className="mt-4 flex flex-col gap-2 items-start">{
          projects.map(proj =>
            <Button className="w-full justify-start" variant="secondary" onClick={() => setProject(proj)}>
              <p className="truncate">{proj.name}</p>
            </Button>
          )
      }</div>
    </>
  );
}
