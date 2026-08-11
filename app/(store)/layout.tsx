import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
