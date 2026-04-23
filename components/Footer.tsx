export default function Footer() {
    return (
      <footer className="px-5 pb-10 pt-12 sm:px-6">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
              <a
                href="mailto:leona.redmann@gmx.net"
                className="transition hover:text-foreground"
              >
                leona.redmann@gmx.net
              </a>
  
              <span className="hidden sm:inline">·</span>
  
              <a
                href="tel:+491731583246"
                className="transition hover:text-foreground"
              >
                +49 173 158 3246
              </a>
            </div>
  
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Leona Josephine
            </p>
          </div>
        </div>
      </footer>
    );
  }