/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  TableQuery,
  UserDoc,
} from "@/components/modules/admin/UsersTable";
import UsersTable from "@/components/modules/admin/UsersTable";
import { useGetAllUsersQuery } from "@/redux/features/userApi/userApi";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import Loading from "@/components/ui/Loading";

const INITIAL: TableQuery = {
  page: 1,
  limit: 10,
  searchTerm: "",
  role: "ALL",
  status: "ALL",
  sort: "createdAt:desc",
};

export default function UserManagement() {
  const [query, setQuery] = useState<TableQuery>(INITIAL);

  // debounce only the free-text search
  const debouncedSearch = useDebouncedValue(query.searchTerm, 350);

  const params = useMemo(
    () => ({
      page: query.page,
      limit: query.limit,
      searchTerm: debouncedSearch.trim() || undefined,
      role: query.role === "ALL" ? undefined : query.role,
      status: query.status === "ALL" ? undefined : query.status,
      sort: query.sort,
    }),
    [
      query.page,
      query.limit,
      debouncedSearch,
      query.role,
      query.status,
      query.sort,
    ]
  );

  const { data, isLoading, isError, error } = useGetAllUsersQuery(params, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    // pollingInterval: POLL_MS,
  });

  const rows: UserDoc[] = data?.data?.data ?? [];
  const total: number = data?.data?.meta ?? 0;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <UsersTable
      controlled={{
        rows,
        total,
        loading: isLoading,
        error: isError
          ? String((error as any)?.message || "Fetch failed")
          : null,
        query,
        onQueryChange: setQuery,
      }}
    />
  );
}
