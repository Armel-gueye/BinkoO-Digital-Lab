import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const Contact2 = ({
  title = "Un Projet ? Contactez-nous !",
  description = "Le digital est notre passion. Nous sommes prêts à discuter de vos défis et à transformer vos processus. Décrivez-nous votre besoin !",
  phone = "+226 44 32 38 41",
  email = "Binkoodigitallab@gmail.com",
  web = { label: "BinkoO Digital Lab", url: "https://binkoodigitallab.com" },
}: Contact2Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Using Web3Forms endpoint - 250 submissions/month limit
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Demande envoyée avec succès ! Nous vous recontacterons sous 24h.");
        form.reset();
      } else {
        toast.error(data.message || "Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      toast.error("Erreur serveur. Veuillez réessayer plus tard ou nous contacter directement par email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Nos Coordonnées
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10">
            {/* Web3Forms Access Key - Required hidden field */}
            <input type="hidden" name="access_key" value="55a2547a-7b37-417e-8044-1a73722325ea" />
            
            {/* Custom subject line for Web3Forms */}
            <input type="hidden" name="_subject" value="Nouvelle demande de contact - BinkoO Digital Lab" />
            
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">Prénom</Label>
                <Input 
                  type="text" 
                  id="firstname" 
                  name="firstname"
                  placeholder="Prénom" 
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Nom</Label>
                <Input 
                  type="text" 
                  id="lastname" 
                  name="lastname"
                  placeholder="Nom" 
                  required
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Votre Email Professionnel</Label>
              <Input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Votre Email Professionnel" 
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Sujet de la Demande</Label>
              <Input 
                type="text" 
                id="subject" 
                name="subject"
                placeholder="Sujet de la Demande" 
                required
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Décrivez votre besoin en automatisation.</Label>
              <Textarea 
                placeholder="Décrivez votre besoin en automatisation." 
                id="message" 
                name="message"
                required
              />
            </div>
            
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma Demande"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};