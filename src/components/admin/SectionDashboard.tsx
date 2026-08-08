import { SECTION_META } from "@/lib/section-config";
import { getRowsForTable } from "@/lib/queries";
import EditorForm from "@/components/admin/EditorForm";

export default async function SectionDashboard({ configKey }: { configKey: string }) {
  const meta = SECTION_META[configKey];
  const rows = await getRowsForTable(meta.table);

  return (
    <>
      <div className="content__head">
        <h1 className="content__title">{meta.icon} {meta.title}</h1>
        {meta.description && <p className="content__desc">{meta.description}</p>}
      </div>
      <EditorForm section={meta} initialRows={rows} />
    </>
  );
}