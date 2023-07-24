import { useState } from "react";
import { useGetUnits } from "@/hooks";
import { UnitsTable } from "./unitsTable";

export default function DashboardUnitsPage() {
  const [query, setQuery] = useState({
    search: "",
    page: 1,
  });

  const { data: units, refetch } = useGetUnits(query);

  return (
    <UnitsTable
      query={query}
      setQuery={setQuery}
      refetch={refetch}
      units={units?.data}
    />
  );
}
