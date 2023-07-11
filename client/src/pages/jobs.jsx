import { AppLayout } from "@/widgets/layout";
import { Job } from "@/components/jobs";

export function JobsPage() {
  return (
    <AppLayout>
      <AppLayout.Header>All jobs</AppLayout.Header>
      <AppLayout.Content>
        <ul>
          <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
            <Job />
          </li>
          <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
            <Job />
          </li>
          <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
            <Job />
          </li>
          <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
            <Job />
          </li>
        </ul>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default JobsPage;
