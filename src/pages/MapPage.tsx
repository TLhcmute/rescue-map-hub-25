import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Check } from "lucide-react";
import { getRescueLocations } from "@/data/mockData"; // Import hàm lấy dữ liệu API
import { RescueLocation, PriorityFilter } from "@/types";
import L from "leaflet";

// Custom marker icons
const createMarkerIcon = (priority: "high" | "low", isNew: boolean) => {
  return L.divIcon({
    className: `rescue-marker-${priority}`,
    html: `<div class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="${
        priority === "high" ? "#EF4444" : "#F59E0B"
      }" stroke="white" stroke-width="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      ${
        isNew
          ? `<span class="absolute top-0 right-0 h-3 w-3 rounded-full bg-blue-500 animate-pulse-marker"></span>`
          : ""
      }
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

// Center map component
const SetMapCenter = ({ locations }: { locations: RescueLocation[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.latitude, loc.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const MapPage = () => {
  const { toast } = useToast();
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [locations, setLocations] = useState<RescueLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState<string | null>(null);
  const [mapCenter] = useState<[number, number]>([21.0278, 105.8342]); // Default center: Hanoi

  // Add leaflet styles - moved inside the component
  useEffect(() => {
    // Check if the leaflet CSS is already added
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
  }, []);

  // Load and filter locations
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await getRescueLocations(); // Gọi hàm lấy dữ liệu từ API
        let filteredLocations = data;

        if (priorityFilter !== "all") {
          filteredLocations = filteredLocations.filter(
            (loc) => loc.priority === priorityFilter
          );
        }

        setLocations(filteredLocations);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cứu hộ:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [priorityFilter]);

  // Xóa phần tử
  const handleMarkResolved = useCallback(
    async (id: string) => {
      setResolving(id);

      try {
        // Gửi yêu cầu DELETE tới API để xóa vị trí khỏi backend
        const response = await fetch(
          `https://byteforce.caohoangphuc.id.vn/nodejs/api/users/${id}`,
          {
            method: "DELETE", // Phương thức DELETE để xóa dữ liệu
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Kiểm tra nếu API trả về lỗi
        if (!response.ok) {
          throw new Error("Không thể xóa vị trí cứu hộ");
        }

        // Cập nhật lại danh sách vị trí trên frontend sau khi xóa thành công
        setLocations((prev) => prev.filter((loc) => loc.id !== id));

        toast({
          title: "Vị trí đã được đánh dấu là đã giải quyết",
          description:
            "Vị trí cứu hộ đã được đánh dấu là đã giải quyết và đã xóa khỏi bản đồ.",
          variant: "default",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Lỗi khi xóa vị trí",
          description: "Có lỗi xảy ra khi xóa vị trí cứu hộ.",
          variant: "destructive",
        });
      } finally {
        setResolving(null); // Đảm bảo kết thúc quá trình giải quyết
      }
    },
    [toast]
  );

  // Format date helper
  const formatDate = (date: Date) => {
    // Kiểm tra nếu date là một đối tượng Date hợp lệ
    if (date instanceof Date && !isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "numeric",
        month: "short",
      }).format(date);
    } else {
      console.error("Invalid date value");
      return ""; // Hoặc giá trị mặc định khác nếu không hợp lệ
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bản đồ cứu hộ</h1>
          <p className="text-muted-foreground mt-1">
            Xem và quản lý các vị trí cứu hộ hoạt động
          </p>
        </div>

        <div className="w-full md:w-auto">
          <Select
            value={priorityFilter}
            onValueChange={(value) =>
              setPriorityFilter(value as PriorityFilter)
            }
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vị trí</SelectItem>
              <SelectItem value="high">Ưu tiên cao</SelectItem>
              <SelectItem value="low">Ưu tiên thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden border-blue-200">
        <CardHeader className="pb-4">
          <CardTitle>Vị trí cứu hộ</CardTitle>
          <CardDescription>
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang tải vị trí cứu hộ...
              </span>
            ) : (
              `Hiển thị ${locations.length} vị trí cứu hộ ${
                locations.length === 1 ? "vị trí" : "vị trí"
              }`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] md:h-[600px] relative border-t">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Đang tải dữ liệu bản đồ...
                  </span>
                </div>
              </div>
            ) : (
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={createMarkerIcon(location.priority, location.isNew)}
                  >
                    <Popup className="map-popup">
                      <div className="space-y-3 min-w-[200px] max-w-[300px] animate-fade-in">
                        <div className="flex justify-between items-start">
                          <Badge
                            variant={
                              location.priority === "high"
                                ? "destructive"
                                : "default"
                            }
                            className="mb-2"
                          >
                            {location.priority === "high"
                              ? "Ưu tiên cao"
                              : "Ưu tiên thấp"}
                          </Badge>

                          {location.isNew && (
                            <Badge variant="outline" className="bg-blue-100">
                              Mới
                            </Badge>
                          )}
                        </div>

                        <p className="font-medium text-gray-900">
                          {location.message}
                        </p>

                        <div className="text-sm text-gray-600">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            <span>{location.address}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Báo cáo: {formatDate(location.createdAt)}
                          </p>
                        </div>

                        <Button
                          onClick={() => handleMarkResolved(location.id)}
                          disabled={resolving === location.id}
                          className="w-full"
                        >
                          {resolving === location.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Đang đánh dấu là đã giải quyết...
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Đánh dấu là đã giải quyết
                            </>
                          )}
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                <SetMapCenter locations={locations} />
              </MapContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Bản đồ chỉ dẫn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#EF4444"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <span className="priority-high">Vị trí ưu tiên cao</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#F59E0B"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <span className="priority-low">Vị trí ưu tiên thấp</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3 relative">
                  <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-blue-500 animate-pulse-marker"></div>
                </div>
                <span className="text-blue-500 font-medium">Chỉ dẫn mới</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Bản đồ chỉ dẫn</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                Click vào các dấu chỉ dẫn để xem thông tin chi tiết về mỗi vị
                trí cứu hộ.
              </li>
              <li>
                Sử dụng thanh lọc để chỉ hiển thị các vị trí cứu hộ ưu tiên cao
                hoặc thấp.
              </li>
              <li>
                Click "Đánh dấu là đã giải quyết" để xóa các vị trí đã giải
                quyết khỏi bản đồ.
              </li>
              <li>
                Các dấu chỉ dẫn mới sẽ được hiển thị bằng các dấu chỉ dẫn nhấp
                nháy xanh.
              </li>
              <li>
                Các dấu chỉ dẫn đỏ chỉ ra các tình huống cứu hộ ưu tiên cao cần
                được chú ý ngay lập tức.
              </li>
              <li>
                Các dấu chỉ dẫn vàng chỉ ra các tình huống cứu hộ ưu tiên thấp
                vẫn cần sự giúp đỡ.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;
