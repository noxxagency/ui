'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  data: PropItem[];
  className?: string;
}

export function PropsTable({ data, className }: PropsTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No props available for this component
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[180px] font-semibold">Property</TableHead>
              <TableHead className="w-[200px] font-semibold">Type</TableHead>
              <TableHead className="w-[120px] font-semibold">Default</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((prop, index) => (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-medium">{prop.name}</span>
                    {prop.required && (
                      <Badge variant="destructive" className="text-[10px] px-1 py-0">
                        required
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {prop.type}
                  </code>
                </TableCell>
                <TableCell>
                  {prop.default ? (
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {prop.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
