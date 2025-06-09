"use client";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import useProject from "~/hooks/use-project";
import CommitLog from "./commit-log";
const DashboardPage = () => {
  // const { user } = useUser();
  const { projects, project, projectId } = useProject();
  if (!project || project.length === 0) {
    return <p className="text-sm text-gray-500">No project linked yet.</p>;
  }
  const repoUrl = project[0]?.githubUrl;

  return (
    <div>
      {projectId}
      <div className="w-fit rounded-md bg-orange-400 px-4 py-5">
        <div className="flex items-center">
          <Github className="size-10 text-black" />
          <div className="ml-2">
            <p className="text-md font-medium text-black">
              This Project is Linked to{" "}
              <Link
                href={repoUrl ?? ""}
                className="inline-flex items-center text-black hover:underline"
              >
                {repoUrl}
                <ExternalLink className="ml-1 size-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="flex items-center gap-4">
        <p>Team memeber</p>
        <p>invite button</p>
        <p>archive button</p>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <p>AskingQuestion</p>
          <p>meeting card</p>
        </div>
      </div>
      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  );
};

export default DashboardPage;
