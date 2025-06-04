import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode; // Content of the sidebar, e.g., filter components
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  title = "Filters",
  children,
  className = "",
}) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={`w-full md:w-72 lg:w-80 space-y-6 p-4 border-r border-gray-200 ${className}`}>
      {title && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <Separator className="my-4" />
        </>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height based on surrounding layout */}
        <div className="space-y-5">
          {children ? children : (
            <>
              {/* Placeholder content if no children are provided */}
              <p className="text-sm text-gray-500">Filter options will appear here.</p>
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Category filter placeholder 1</p>
                  <p className="text-xs text-gray-400">Category filter placeholder 2</p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <p className="text-xs text-gray-400">Price slider placeholder</p>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;