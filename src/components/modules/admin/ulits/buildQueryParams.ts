import type { TableQuery } from "@/components/modules/admin/UsersTable";

export function buildQueryParams(q: TableQuery) {
  return {
    page: q.page,
    limit: q.limit,
    searchTerm: q.search.trim() || undefined,
    role: q.role === "ALL" ? undefined : q.role,
    status: q.status === "ALL" ? undefined : q.status,
    sort: q.sort || undefined,
  } as const;
}
