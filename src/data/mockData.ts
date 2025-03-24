import { RescueLocation, FeedbackEntry } from "@/types";

export const getRescueLocations = async (): Promise<RescueLocation[]> => {
  // Giả lập dữ liệu thay vì gọi API
  const mockData = {
    locations: [
      {
        id: "1",
        message: "Lũ lụt nghiêm trọng tại khu A",
        latitude: 10.7769, // TP.HCM
        longitude: 106.7009,
        address: "Quận 1, TP.HCM",
        priority: "high",
        isNew: true,
        createdAt: new Date("2025-03-24T08:00:00"), // Thời gian giả lập
      },
      {
        id: "2",
        message: "Cây đổ chắn đường",
        latitude: 10.8231, // Gần Quận 7
        longitude: 106.6297,
        address: "Quận 7, TP.HCM",
        priority: "low",
        isNew: false,
        createdAt: new Date("2025-03-23T15:30:00"),
      },
      {
        id: "3",
        message: "Tai nạn giao thông",
        latitude: 10.85, // Gần Thủ Đức
        longitude: 106.7719,
        address: "Thủ Đức, TP.HCM",
        priority: "high",
        isNew: true,
        createdAt: new Date("2025-03-24T09:15:00"),
      },
    ],
  };

  try {
    // Giả lập độ trễ như gọi API thật
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Mock data:", mockData); // Kiểm tra dữ liệu giả lập
    return mockData.locations;
  } catch (error) {
    console.error("Lỗi khi lấy mock data:", error);
    return [];
  }
};

export const mockFeedbackEntries: FeedbackEntry[] = [
  {
    id: "1",
    name: "Nguyen Van A",
    message:
      "Đội cứu hộ đã đến nhanh chóng và giúp đưa gia đình chúng tôi thoát khỏi tình trạng kẹt. Cảm ơn!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: "2",
    name: "Tran Thi B",
    message:
      "Đội cứu hộ đã cung cấp sự giúp đỡ nhanh chóng và tổ chức hiệu quả. Cảm ơn!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "3",
    name: "Le Van C",
    message: "Thực phẩm và nước uống đã được giao cho cộng đồng. Rất cảm ơn!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
];
