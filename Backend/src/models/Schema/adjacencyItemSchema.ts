import { Schema } from "mongoose";
import { IAdjacencyItem } from "../types/adjacencyItemInterface.js";

export const adjacencyItemSchema = new Schema<IAdjacencyItem>(
  {
    node: { type: Schema.Types.ObjectId, required: true },
    weight: { type: Number, required: true, default: 1 },
    targetFloorId: { type: Schema.Types.ObjectId, ref: "Floor", required: false }, // إمكانية التوصيل بدور آخر
  },
  { _id: false },
);