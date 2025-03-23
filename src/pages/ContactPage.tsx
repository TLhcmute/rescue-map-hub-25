import { useState, useRef, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Mail, MapPin, Send, Loader2, Clock } from "lucide-react";
import { mockFeedbackEntries } from "@/data/mockData";
import { FeedbackEntry } from "@/types";

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackEntries, setFeedbackEntries] =
    useState<FeedbackEntry[]>(mockFeedbackEntries);
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
        timestamp: new Date(),
      };

      // Add to list (prepend to show newest first)
      setFeedbackEntries((prev) => [newEntry, ...prev]);

      // Reset form
      setName("");
      setMessage("");
      setSubmitting(false);

      // Show toast
      toast({
        title: "Phản hồi đã gửi!",
        description: "Phản hồi của bạn đã được nhận bởi đội cứu hộ.",
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
    if (interval > 1) return Math.floor(interval) + " năm trước";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " tháng trước";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " ngày trước";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " giờ trước";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " phút trước";

    return Math.floor(seconds) + " giây trước";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Liên hệ đội cứu hộ
        </h1>
        <p className="text-muted-foreground mt-1">Liên hệ với đội cứu hộ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-blue-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 pb-6">
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>Cách liên hệ với đội cứu hộ</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Đường dây cứu hộ</h3>
                  <p className="text-blue-600">+84 123 456 789</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Sẵn sàng 24/7 cho các tình huống khẩn cấp
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Email</h3>
                  <p className="text-blue-600">rescue@maphub.org</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Phản hồi trong vòng 24 giờ
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Trụ sở chính</h3>
                  <p className="text-gray-700">
                    123 Trung tâm cứu hộ,
                    <br />
                    Quận Cầu Giấy, Hà Nội
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mở cửa từ 8 giờ sáng đến 8 giờ tối hàng ngày
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Giờ hoạt động</CardTitle>
              <CardDescription>Đội cứu hộ sẵn sàng hỗ trợ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Hoạt động khẩn cấp</span>
                </div>
                <span className="text-sm font-medium">24/7</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Trụ sở quản lý</span>
                </div>
                <span className="text-sm font-medium">
                  8 giờ sáng - 5 giờ chiều
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Trung tâm hỗ trợ</span>
                </div>
                <span className="text-sm font-medium">
                  7 giờ sáng - 9 giờ tối
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback and Communication Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Feedback Form */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Gửi phản hồi</CardTitle>
              <CardDescription>Chia sẻ phản hồi với đội cứu hộ</CardDescription>
            </CardHeader>
            <form ref={formRef} onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Tên của bạn
                  </label>
                  <Input
                    id="name"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Tin nhắn
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Nhập tin nhắn hoặc phản hồi..."
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
                      Gửi...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Gửi phản hồi
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Feedback Log */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Phản hồi gần đây</CardTitle>
              <CardDescription>
                Phản hồi từ thành viên tham gia cứu hộ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Không có phản hồi từ thành viên tham gia cứu hộ.</p>
                  </div>
                ) : (
                  feedbackEntries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`p-4 border rounded-lg ${
                        index === 0
                          ? "border-blue-300 bg-blue-50 animate-fade-in"
                          : "border-gray-200"
                      }`}
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
