import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 flex-col text-center">
      <div className="mb-12">
        <Logo className="h-12" />
      </div>
      <div className="space-y-6 max-w-md glass p-12 rounded-[2.5rem] border-border/10 shadow-premium">
        <h1 className="text-8xl font-display font-black tracking-tight text-primary/20">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-black tracking-tight text-foreground">Lost in deep space?</h2>
          <p className="text-muted-foreground font-bold">The page you're looking for has moved to a different orbit or no longer exists.</p>
        </div>
        <div className="pt-6 flex flex-col gap-3">
          <Link to="/">
            <Button className="w-full h-14 rounded-2xl font-black gap-2 shadow-soft transition-all hover:scale-[1.02]">
              <Home className="h-4 w-4" /> Return to Home
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => window.history.back()} className="w-full h-14 rounded-2xl font-black gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
