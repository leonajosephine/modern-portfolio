"use client";

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-8 sm:px-6">
      <div className="container">
        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Leona Josephine Redmann. All rights
            reserved.
            </p>

            <p className="text-sm text-muted-foreground">
              Crafted with 💛 and lots of coffee. Leona 🐬
            </p>
          </div>

          {/*<p className="mt-6 text-center text-xs text-muted-foreground/70">
            LJR🐬
          </p>*/}
        </div>
      </div>
    </footer>
  );
}