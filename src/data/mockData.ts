import { RescueLocation, FeedbackEntry } from "@/types";

export const getRescueLocations = async (): Promise<RescueLocation[]> => {
  try {
    const response = await fetch(
      "https://byteforce.caohoangphuc.id.vn/python/get_result"
    );

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ API");
    }

    const data = await response.json();
    console.log(data); // Kiểm tra cấu trúc dữ liệu nhận được

    // Kiểm tra xem 'locations' có tồn tại trong 'data'
    if (!data.locations) {
      console.error("Không có dữ liệu 'locations' trong API trả về.");
      return [];
    }

    return data.locations;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ API:", error);
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
