import { Tabs, TabList, Tab, TabPanel } from './atoms/Tabs/Tabs';

function TabCompnentExamples() {
  return (
    <div className="space-y-8 p-4">
      {/* Basic Tabs */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Basic Tabs</h2>
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Account</Tab>
            <Tab value="tab2">Password</Tab>
            <Tab value="tab3">Settings</Tab>
          </TabList>
          <TabPanel value="tab1" className="p-4">
            Account settings content
          </TabPanel>
          <TabPanel value="tab2" className="p-4">
            Password settings content
          </TabPanel>
          <TabPanel value="tab3" className="p-4">
            Other settings content
          </TabPanel>
        </Tabs>
      </section>

      {/* Pills Variant */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Pills Variant</h2>
        <Tabs variant="pills" defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3" disabled>
              Tab 3 (Disabled)
            </Tab>
          </TabList>
          <TabPanel value="tab1" className="p-4">
            Content 1
          </TabPanel>
          <TabPanel value="tab2" className="p-4">
            Content 2
          </TabPanel>
          <TabPanel value="tab3" className="p-4">
            Content 3
          </TabPanel>
        </Tabs>
      </section>

      {/* Enclosed Variant */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Enclosed Variant</h2>
        <Tabs variant="enclosed" defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1" className="p-4">
            Content 1
          </TabPanel>
          <TabPanel value="tab2" className="p-4">
            Content 2
          </TabPanel>
          <TabPanel value="tab3" className="p-4">
            Content 3
          </TabPanel>
        </Tabs>
      </section>

      {/* Vertical Orientation */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Vertical Orientation</h2>
        <Tabs orientation="vertical" defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <div className="flex flex-1">
            <TabPanel value="tab1" className="p-4">
              Content 1
            </TabPanel>
            <TabPanel value="tab2" className="p-4">
              Content 2
            </TabPanel>
            <TabPanel value="tab3" className="p-4">
              Content 3
            </TabPanel>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default TabCompnentExamples;
