export default function DashboardDesktopHeader({ children }) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 ml-[283px] hidden h-[70px] items-center justify-between border border-gray-300 bg-white p-4 px-5 py-3 md:flex">
      {children}
    </div>
  );
}
