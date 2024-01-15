import { Layout } from "@/components/layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";

export const Profile = () => {
  return (
    <Layout>
      <ResizablePanelGroup direction={"horizontal"}>
        <ResizablePanel defaultSize={15}>
          <div
            className={
              "flex flex-col text-gray-500 child-hover:underline child:font-light"
            }
          >
            <text>Option 1</text>
            <text>Option 2</text>
            <text>Option 3</text>
            <text>Option 4</text>
            <text>Option 5</text>
            <text>Option 6</text>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  );
};
