import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/database.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Demo Remix Vercel" },
    { name: "description", content: "Demo Remix on Vercel with Prisma" },
  ];
};

export const loader: LoaderFunction = async () => {
  const jobs = await prisma.job.findMany();

  return {
    message: "Hello from Remix!",
    jobs,
  };
};

export default function IndexRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="space-y-8 p-8">
      <h1>Demo Remix Vercel</h1>
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify(loaderData, null, 2)}
      </pre>
    </div>
  );
}
