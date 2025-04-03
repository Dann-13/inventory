import { Slider } from "@/components/dashboard/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex">
     <div className="min-h-screen grid grid-cols-1 xl:grid-cols-9">
        <div className="xl:col-span-2">
          <Slider />
        </div>
        <div className="xl:col-span-7">
          <div className="h-[100vh] overflow-y-scroll lg:p-8 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
