import { TESTIMONIALS } from "@/lib/constants";
import { generateStarRating } from "@/lib/utils";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 font-poppins">Community Stories</h2>
        <p className="text-neutral-dark text-center mb-12 max-w-2xl mx-auto">
          Hear from ReVogue users who've embraced sustainable fashion as part of their lifestyle.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-neutral-lightest rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src={`${testimonial.image}?auto=format&fit=crop&w=150&h=150&q=80`} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-neutral-dark">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-neutral-dark mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex text-yellow-400">
                {generateStarRating(testimonial.rating).map((star, i) => (
                  <span key={i}>
                    {star.type === "full" && <i className="ri-star-fill"></i>}
                    {star.type === "half" && <i className="ri-star-half-fill"></i>}
                    {star.type === "empty" && <i className="ri-star-line"></i>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
