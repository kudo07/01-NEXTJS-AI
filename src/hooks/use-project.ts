import { useLocalStorage } from "usehooks-ts";
import { api } from "~/trpc/react";

const useProject = () => {
  const { data: projects } = api.project.getProject.useQuery();
  const [projectId, setProjectId] = useLocalStorage("Gitchage-projectId", "");
  const project = projects?.filter((project) => project.id == projectId);
  return {
    projects,
    project,
    projectId,
    setProjectId,
  };
};
export default useProject;
