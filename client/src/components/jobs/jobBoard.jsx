import { AppLayout } from "@/widgets/layout";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Myjobs from "./myJobs";
function jobBoard() {
    const data = [
    {
      label: "My Jobs",
      value: "my jobs",
      desc: <Myjobs />,
    },
    {
      label: "Employees",
      value: "employees",
      desc:"employees" //<Analytics />,
    }

  ];
    return (
        <AppLayout>
            <AppLayout.Header>Job Board</AppLayout.Header>
            <AppLayout.Content>
            <div className="h-full overflow-scroll">
            <Tabs value="my jobs">
                <TabsHeader>
                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
            </div>
            </AppLayout.Content>
        </AppLayout>
    )
}
export default jobBoard;