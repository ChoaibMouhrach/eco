import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import DataTable from "@/components/custom/data/table";
import { IPaginate } from "@/interfaces/Common";
import { ITag } from "@/interfaces/Tag";
import debounce from "@/lib/debounce";
import { DeleteTagDialog } from "./DeleteTagDIalog";

interface IQuery {
  search: string;
  page: number;
}

interface TagsTableProps {
  query: IQuery;
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;

  refetch: () => any;

  columns: ColumnDef<ITag>[];
  tags?: IPaginate<ITag>;
}

export function TagsTable({
  columns,
  tags,
  query,
  refetch,
  setQuery,
}: TagsTableProps) {
  const [deleteTag, setDeleteTag] = useState<ITag | null>(null);
  const router = useRouter();

  const onSearchChange = useCallback(
    debounce((search: string) => {
      setQuery({
        ...query,
        search,
      });
    }),
    []
  );

  const onPaginationChange = (pagination: PaginationState) => {
    setQuery({
      ...query,
      page: pagination.pageIndex + 1,
    });
  };

  return (
    <>
      <DataTable<ITag>
        // data
        columns={columns}
        data={tags?.data ?? []}
        pageCount={tags ? Math.ceil(tags.count / tags.limit) : 1}
        // handlers
        onPaginationChange={onPaginationChange}
        onSearchChange={onSearchChange}
        actions={{
          Update: (tag: ITag) => {
            router.push(`/dashboard/tags/edit/${tag.id}`);
          },
          Delete: (tag: ITag) => {
            setDeleteTag(tag);
          },
        }}
      />

      {deleteTag && (
        <DeleteTagDialog
          tag={deleteTag}
          setTag={setDeleteTag}
          refetch={refetch}
        />
      )}
    </>
  );
}
