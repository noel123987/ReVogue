import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/lib/constants";

const CTASection = () => {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-poppins">
          Ready to join the circular fashion revolution?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
          Create your account today and discover a new way to enjoy fashion that's kinder to the planet and your wallet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <ButtonLink 
            href={ROUTES.REGISTER} 
            className="bg-white hover:bg-neutral-lightest text-primary font-medium"
          >
            Sign Up Now
          </ButtonLink>
          <ButtonLink 
            href={ROUTES.ABOUT} 
            className="bg-transparent hover:bg-secondary-dark border-2 border-white text-white font-medium"
          >
            Learn More
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
