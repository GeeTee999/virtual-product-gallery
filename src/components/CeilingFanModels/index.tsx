
import { CeilingFanModel as ClassicModel } from "../CeilingFanModel";
import { SimpleFanModel } from "./SimpleFanModel";
import { ModernFanModel } from "./ModernFanModel";
import { IndustrialFanModel } from "./IndustrialFanModel";
import { LuxuryFanModel } from "./LuxuryFanModel";

export const FanModels = {
  classic: ClassicModel,
  simple: SimpleFanModel,
  modern: ModernFanModel,
  industrial: IndustrialFanModel,
  luxury: LuxuryFanModel
};

export const MODEL_DATA = [
  { id: "classic", name: "Classic" },
  { id: "simple", name: "Simple" },
  { id: "modern", name: "Modern" },
  { id: "industrial", name: "Industrial" },
  { id: "luxury", name: "Luxury" }
];
