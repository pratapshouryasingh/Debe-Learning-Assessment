import Header from "@/components/Header";
import SessionGrid from "@/components/SessionGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-12">
        <Header />

        <SessionGrid />
      </div>
    </main>
  );
}