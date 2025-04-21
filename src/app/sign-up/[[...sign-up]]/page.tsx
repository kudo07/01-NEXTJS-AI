import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen items-end justify-center">
      <SignUp />;
    </div>
  );
}
