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
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
              mounted ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">ByteRescue Map Hub</span>
              <span className="block text-blue-500">Nền tảng phối hợp</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Một nền tảng tinh vi được thiết kế để phối hợp các nỗ lực cứu hộ
              một cách hiệu quả. Truy cập dữ liệu vị trí theo thời gian thực,
              quản lý các ưu tiên cứu hộ và giao tiếp liền mạch với các đội cứu
              hộ.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/map">
                <Button size="lg" className="group">
                  <span>Xem Bản đồ cứu hộ</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Liên hệ đội cứu hộ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tính năng cần thiết
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="h-8 w-8 text-blue-500" />,
                title: "Bản đồ tương tác",
                description:
                  "Xem tất cả các vị trí cứu hộ trên bản đồ tương tác với các chỉ số ưu tiên.",
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-500" />,
                title: "Cập nhật thời gian thực",
                description:
                  "Nhận cập nhật thời gian thực về trạng thái cứu hộ và yêu cầu mới.",
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-500" />,
                title: "Lọc ưu tiên",
                description:
                  "Lọc các yêu cầu cứu hộ dựa trên các mức ưu tiên cho phản hồi hiệu quả.",
              },
              {
                icon: <Phone className="h-8 w-8 text-blue-500" />,
                title: "Giao tiếp đội",
                description:
                  "Kênh giao tiếp trực tiếp với thành viên đội cứu hộ.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`glass-panel rounded-xl p-6 transition-all duration-500 hover:shadow-xl ease-in-out ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${150 * index}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-50 p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
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
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng phối hợp cứu hộ?</h2>
          <p className="mb-8 text-blue-50">
            Truy cập bản đồ tương tác để xem yêu cầu cứu hộ hiện tại hoặc liên
            hệ đội cứu hộ để hỗ trợ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/map">
              <Button variant="secondary" size="lg">
                Xem Bản đồ cứu hộ
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                size="lg"
              >
                Liên hệ đội cứu hộ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
