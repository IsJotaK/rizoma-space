import { getSiteData } from "@/lib/site";
import PreviewShell from "./PreviewShell";

export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  const data = await getSiteData();
  return <PreviewShell initial={data} />;
}