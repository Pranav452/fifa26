import Bracket from "./components/Bracket";
import Groups from "./components/Groups";

const NAV = ["News", "Transfers", "About", "TV schedules"];

function TopBar() {
  return (
    <header className="flex h-12 w-full items-center gap-4 border-b border-line bg-background px-4 sm:px-8">
      <span className="text-lg font-extrabold tracking-tight text-foreground">
        FOT<span className="text-accent">MOB</span>
      </span>
      <div className="hidden flex-1 sm:block">
        <div className="flex max-w-xs items-center gap-2 rounded-full border border-line bg-card2 px-3 py-1">
          <svg viewBox="0 0 16 16" className="size-3.5 fill-muted" aria-hidden>
            <path d="M11.7 10.3 14 12.6 12.6 14l-2.3-2.3a6 6 0 1 1 1.4-1.4ZM7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          </svg>
          <span className="text-xs text-muted">Search</span>
        </div>
      </div>
      <nav className="ml-auto flex items-center gap-5 text-sm text-foreground/80">
        {NAV.map((n) => (
          <span key={n} className="hidden whitespace-nowrap hover:text-foreground md:inline">
            {n}
          </span>
        ))}
      </nav>
    </header>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <TopBar />
      <main className="w-full">
        <Bracket />
        <Groups />
      </main>
    </div>
  );
}
