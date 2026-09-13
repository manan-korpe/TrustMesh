import {
  Car,
  Cpu,
  Laptop,
  Smartphone,
} from "lucide-react";

export function getAssetIcon(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("laptop")) {
    return Laptop;
  }

  if (normalizedType.includes("mobile")) {
    return Smartphone;
  }

  if (normalizedType.includes("vehicle")) {
    return Car;
  }

  return Cpu;
}