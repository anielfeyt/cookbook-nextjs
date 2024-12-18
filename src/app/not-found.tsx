import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center pt-10">
      <h2>404: Not Found</h2>
      <p className="mb-4">Could not find requested resource.</p>
      <Link href="/" className="btn">
        Return Home
      </Link>
    </div>
  );
}
