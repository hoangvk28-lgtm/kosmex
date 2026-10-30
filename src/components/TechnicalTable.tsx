import type { SpecRow } from "@/content/products";

/**
 * Specification table. Pending rows never show a value, so sample data
 * cannot be mistaken for a commercial specification.
 */
export function TechnicalTable({ rows, caption, legend = true }: { rows: SpecRow[]; caption: string; legend?: boolean }) {
  return (
    <div>
      <div className="table-scroll rounded-2xl border border-line bg-white">
        <table className="spec-table min-w-[480px]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{r.status === "pending" ? <span className="pending-value">Awaiting Kosmex data</span> : r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
