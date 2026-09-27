import { redirect } from "next/navigation";
import { projects } from "@/lib/data";

const slugAliases: Record<string, string> = {
  "teacheranne": "teacher-anne",
  "ayumi-rich": "ayumirich",
  "syncdesk": "cnhs-learn",
};

export function generateStaticParams() {
  const directSlugs = projects.map((p) => ({ slug: p.slug }));
  const aliasSlugs = Object.keys(slugAliases).map((slug) => ({ slug }));
  return [...directSlugs, ...aliasSlugs];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  await params;
  redirect("/projects");
}
