
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl -z-10"></div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8 rounded-3xl overflow-hidden">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Rescue Map Hub</span>
              <span className="block text-blue-500">Coordination Platform</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              A sophisticated platform designed to coordinate rescue efforts efficiently. Access real-time location data, manage rescue priorities, and communicate with rescue teams seamlessly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/map">
                <Button size="lg" className="group">
                  <span>View Rescue Map</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Essential Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="h-8 w-8 text-blue-500" />,
                title: "Interactive Map",
                description: "View all rescue locations on an interactive map with priority indicators."
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-500" />,
                title: "Real-time Updates",
                description: "Get real-time updates on rescue statuses and new requests."
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-500" />,
                title: "Priority Filtering",
                description: "Filter rescue requests based on priority levels for efficient response."
              },
              {
                icon: <Phone className="h-8 w-8 text-blue-500" />,
                title: "Team Communication",
                description: "Direct communication channel with rescue team members."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`glass-panel rounded-xl p-6 transition-all duration-500 hover:shadow-xl ease-in-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${150 * index}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-50 p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 rounded-2xl py-12 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Coordinate Rescue Efforts?</h2>
          <p className="mb-8 text-blue-50">
            Access the interactive map to view current rescue requests or contact the team for assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/map">
              <Button variant="secondary" size="lg">
                View Rescue Map
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" size="lg">
                Contact Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
