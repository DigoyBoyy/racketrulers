export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="mt-1.5 text-muted-foreground">
          Manage administrators and system settings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Create Admin User</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Add new administrator accounts for coaches and organizers.
          </p>
          <a
            href="/dashboard/admin/create-user"
            className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
          >
            Create User →
          </a>
        </div>
      </div>
    </div>
  );
}