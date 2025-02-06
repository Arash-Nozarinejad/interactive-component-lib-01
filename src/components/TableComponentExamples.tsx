import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './atoms/Table/Table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

function TableComponentExamples() {
  const data: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' }
  ];

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Table Examples</h1>

      {/* Basic Sortable Table */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Basic Sortable Table</h2>
        <Table
          data={data}
          defaultSortColumn="name"
          bordered
          hoverable
        >
          <TableHeader>
            <TableRow>
              <TableHead sortKey="name">Name</TableHead>
              <TableHead sortKey="email">Email</TableHead>
              <TableHead sortKey="role">Role</TableHead>
              <TableHead sortKey="status">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={[
                      'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    ].filter(Boolean).join(' ')}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Striped & Compact Table */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Striped & Compact</h2>
        <Table
          data={data}
          striped
          bordered
          density="compact"
        >
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

export default TableComponentExamples;
