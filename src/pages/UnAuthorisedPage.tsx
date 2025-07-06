import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-white">
            Access Denied
          </h1>
        </div>

        <p className="mt-6 text-lg font-medium text-gray-400 sm:text-xl">
          You’re not authorized to view this page.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row sm:justify-center items-center gap-4 sm:gap-6">
          <motion.a
            href="/"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-md border border-white bg-transparent px-6 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            Go back home
          </motion.a>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-300 transition"
          >
            Contact support <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
