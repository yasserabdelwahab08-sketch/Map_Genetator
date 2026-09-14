import { Types } from "mongoose";

export interface IAdjacencyItem {
  node: Types.ObjectId;
  weight: number;
  targetFloorId?: Types.ObjectId; // معرف الدور في حال كان التوصيل لعقدة في دور آخر (مثل السلالم أو المصاعد)
}