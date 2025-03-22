
import { RescueLocation, FeedbackEntry } from "@/types";

export const mockRescueLocations: RescueLocation[] = [
  {
    id: "1",
    latitude: 21.0278,
    longitude: 105.8342,
    message: "Family trapped on second floor due to flooding",
    address: "123 Hanoi Street, Hoan Kiem District",
    priority: "high",
    isNew: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: "2",
    latitude: 21.0376,
    longitude: 105.7658,
    message: "Elderly couple needs evacuation assistance",
    address: "456 Cau Giay Road, Ba Dinh District",
    priority: "high",
    isNew: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  },
  {
    id: "3",
    latitude: 21.0189,
    longitude: 105.8598,
    message: "Medical supplies needed for community shelter",
    address: "789 Long Bien Street, Long Bien District",
    priority: "low",
    isNew: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
  },
  {
    id: "4",
    latitude: 21.0139,
    longitude: 105.8075,
    message: "Food and water supplies running low at shelter",
    address: "101 Dong Da Boulevard, Dong Da District",
    priority: "low",
    isNew: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 180) // 3 hours ago
  },
  {
    id: "5",
    latitude: 21.0483,
    longitude: 105.8013,
    message: "Structural damage to building, people trapped",
    address: "202 Tay Ho Road, Tay Ho District",
    priority: "high",
    isNew: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  }
];

export const mockFeedbackEntries: FeedbackEntry[] = [
  {
    id: "1",
    name: "Nguyen Van A",
    message: "The rescue team arrived quickly and helped evacuate our family. Thank you!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
  },
  {
    id: "2",
    name: "Tran Thi B",
    message: "Medical assistance was provided efficiently. Great coordination!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
  {
    id: "3",
    name: "Le Van C",
    message: "Food and water supplies were delivered to our community. Much appreciated!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
  }
];
