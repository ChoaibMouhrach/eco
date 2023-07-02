import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataTable from "@/components/custom/DataTable";
import { DashboardLayout } from "@/components/layouts";
import { useDeletePurchase, useGetPurchases } from "@/hooks";
import { IPurchase } from "@/interfaces/Purchase";
import { IItem } from "@/interfaces/Order";
import { IUser } from "@/interfaces/User";
import debounce from "@/lib/debounce";
import { withAuth } from "@/middlewares";

interface PurchasesProps {
  user: IUser;
}

const columns: ColumnDef<IPurchase>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "User",
    cell: ({ row }) => (
      <span>
        {row.original.user.firstName} {row.original.user.lastName}
      </span>
    ),
  },
  {
    header: "Items",
    cell: ({ row }) => <span>{row.original.items.length}</span>,
  },
  {
    header: "Total Items",
    cell: ({ row }) => (
      <span>
        {
          row.original.items.reduce((acc, cur) => {
            return {
              quantity: acc.quantity + cur.quantity,
            } as IItem;
          }).quantity
        }
      </span>
    ),
  },
  {
    header: "Total Profit",
    cell: ({ row }) => (
      <span>
        {row.original.items
          .map((item) => item.quantity * item.price)
          .reduce((acc, cur) => acc + cur)}
      </span>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
];

export default function Purchases({ user }: PurchasesProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 8,
    pageIndex: 0,
  });

  const { data: purchases, refetch } = useGetPurchases({
    search,
    page: pagination.pageIndex + 1,
  });

  const { mutate: deletepurchase } = useDeletePurchase();

  // useEffect
  useEffect(() => {
    refetch();
  }, [search, pagination]);

  // handlers
  const changeSearch = debounce((value: string) => {
    setSearch(value);
  });

  const handleSearch = (value: string) => {
    changeSearch(value);
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/purchases/edit/${id}`);
  };

  const handleDelete = (id: number) =>
    deletepurchase(id, { onSuccess: () => refetch() });

  return (
    <DashboardLayout
      user={user}
      title="Purchases"
      description="You can manage your purchases from here."
    >
      <DataTable<IPurchase>
        pageCount={
          purchases ? Math.ceil(purchases.data.count / purchases.data.limit) : 0
        }
        columns={columns}
        data={purchases?.data.data ?? []}
        pagination={pagination}
        setPagination={setPagination}
        handleSearch={handleSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
