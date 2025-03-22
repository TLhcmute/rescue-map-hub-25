
import { useState, useRef, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send, Loader2, Clock } from "lucide-react";
import { mockFeedbackEntries } from "@/data/mockData";
import { FeedbackEntry } from "@/types";

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>(mockFeedbackEntries);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate sending data
    setTimeout(() => {
      // Create new feedback entry
      const newEntry: FeedbackEntry = {
        id: Date.now().toString(),
        name,
        message,
        timestamp: new Date()
      };
      
      // Add to list (prepend to show newest first)
      setFeedbackEntries(prev => [newEntry, ...prev]);
      
      // Reset form
      setName("");
      setMessage("");
      setSubmitting(false);
      
      // Show toast
      toast({
        title: "Feedback Sent!",
        description: "Your feedback has been received by the rescue team.",
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 1500);
  };

  // Format timestamp helper
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Rescue Team</h1>
        <p className="text-muted-foreground mt-1">Get in touch with the rescue coordination team</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-blue-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 pb-6">
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Ways to reach the rescue coordination team
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Emergency Hotline</h3>
                  <p className="text-blue-600">+84 123 456 789</p>
                  <p className="text-xs text-gray-500 mt-1">Available 24/7 for emergencies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Email</h3>
                  <p className="text-blue-600">rescue@maphub.org</p>
                  <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Headquarters</h3>
                  <p className="text-gray-700">123 Rescue Center,<br />Cau Giay District, Hanoi</p>
                  <p className="text-xs text-gray-500 mt-1">Open 8 AM - 8 PM daily</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Operation Hours</CardTitle>
              <CardDescription>
                Our team is here to help
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Emergency Operations</span>
                </div>
                <span className="text-sm font-medium">24/7</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Administrative Office</span>
                </div>
                <span className="text-sm font-medium">8 AM - 5 PM</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Support Center</span>
                </div>
                <span className="text-sm font-medium">7 AM - 9 PM</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Feedback and Communication Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Feedback Form */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Send Feedback</CardTitle>
              <CardDescription>
                Share your feedback with the rescue coordination team
              </CardDescription>
            </CardHeader>
            <form ref={formRef} onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message or feedback..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={submitting || !name || !message}
                  className="w-full sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Feedback Log */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>
                Feedback from rescue operation participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No feedback entries yet.</p>
                  </div>
                ) : (
                  feedbackEntries.map((entry, index) => (
                    <div 
                      key={entry.id}
                      className={`p-4 border rounded-lg ${index === 0 ? 'border-blue-300 bg-blue-50 animate-fade-in' : 'border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{entry.name}</h3>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimeAgo(entry.timestamp)}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{entry.message}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
