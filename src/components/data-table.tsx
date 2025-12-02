import { Card } from "@/components/ui/card";
import type { Judgment } from "@/types/judgment";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataTableProps {
  data?: Judgment[];
  loading: boolean;
  page?: number;
  setPage?: (p: number) => void;
  total?: number;
  pageSize?: number;
}

export default function DataTable({
  data,
  loading,
  page,
  setPage,
  total,
  pageSize,
}: DataTableProps) {
  const totalPages =  Math.ceil((total || 0) / (pageSize || 1));
  const [jumpPage, setJumpPage] = useState<string>("");

  const handleJump = () => {
    const num = Number(jumpPage);
    if (!num || num < 1 || num > totalPages) return;
    setPage?.(num);
    setJumpPage("");
  };

  return (
    <Card className="border border-border bg-card p-6 shadow-sm mt-4">
      <h3 className="text-lg font-semibold mb-4">Judgment Results</h3>

      {loading && <p className="text-muted-foreground">Loading...</p>}

      {!loading && data?.length === 0 && (
        <p className="text-muted-foreground">No judgments found.</p>
      )}

      {!loading && data && data.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full border-collapse">
              <thead className="bg-muted/40 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Title
                  </th>
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Case Number
                  </th>
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Judge
                  </th>
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Court
                  </th>
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Timestamp
                  </th>
                  <th className="p-4 w-[120px]"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{row.title}</td>
                    <td className="p-4 text-muted-foreground">
                      {row.case_number}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {row.judge_name}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {row.court_name}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/cases/${row.id}`}
                        className="text-primary font-medium hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {page != undefined && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage?.(page - 1)}
                >
                  Previous
                </Button>

                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage?.(page + 1)}
                >
                  Next
                </Button>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Page #"
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    className="w-20"
                  />
                  <Button variant="outline" onClick={handleJump}>
                    Go
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
