import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";
import { openWhatsApp } from "@/utils/whatsapp";

const NotFound = () => {
  const location = useLocation();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 animate-scale-in">
          <h1 className="font-satoshi font-bold text-6xl lg:text-8xl text-primary mb-4">
            404
          </h1>
          <h2 className="font-satoshi font-semibold text-2xl lg:text-3xl text-foreground mb-4">
            Page Introuvable
          </h2>
          <p className="font-inter text-muted-foreground leading-relaxed">
            Oops ! La page que vous cherchez semble s'être volatilisée dans l'espace digital.
            Retournons en terrain connu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Page précédente
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="font-inter text-sm text-muted-foreground">
            Besoin d'aide ?
            <a
              href="#"
              onClick={handleWhatsAppClick}
              className="text-primary hover:underline ml-1"
            >
              Contactez-nous sur WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;