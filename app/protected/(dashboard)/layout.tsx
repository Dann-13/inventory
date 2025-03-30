import { Slider } from "@/components/dashboard/Sidebar";

export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="w-full h-screen">
        <div className="flex">
          <Slider />
          {children}
        </div>
      </div>
    );
  }
  