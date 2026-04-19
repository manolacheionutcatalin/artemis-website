import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AnalyticsTracker from "@/components/Analytics/AnalyticsTracker";
import { Suspense } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
