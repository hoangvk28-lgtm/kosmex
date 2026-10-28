import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="on-dark relative overflow-hidden bg-forest text-white">
      <div className="film-surface absolute inset-y-0 right-0 hidden w-1/3 opacity-60 md:block" aria-hidden />
      <div className="wrap relative section">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="max-w-2xl text-white">This page could not be found.</h1>
        <p className="lede mt-5 max-w-xl">The address may have changed. Try one of these instead.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="gold">Home</Button>
          <Button href="/products/" variant="light">Products</Button>
          <Button href="/request-a-quote/" variant="light">Request a Quote</Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/75">
          <li><Link href="/products/film-faced-plywood/" className="hover:text-white">Film Faced Plywood</Link></li>
          <li><Link href="/certificates/" className="hover:text-white">Certificates</Link></li>
          <li><Link href="/eu/" className="hover:text-white">EU Markets</Link></li>
          <li><Link href="/contact/" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>
    </section>
  );
}
