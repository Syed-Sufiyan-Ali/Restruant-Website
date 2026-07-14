import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/client";
import { ok, notFound, forbidden, serverError } from "@/lib/api/response";
type Ctx = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  try {
    const userId = req.headers.get("x-user-id")!;
    const role   = req.headers.get("x-user-role")!;
    const order  = await prisma.order.findUnique({
      where:{ id },
      include:{ items:{ include:{ menuItem:{ select:{ name:true, images:{ where:{ isPrimary:true }, take:1, select:{ url:true } } } }, size:true, addons:{ include:{ addon:{ select:{ label:true, price:true } } } } } }, address:true, timeline:{ orderBy:{ createdAt:"asc" } }, coupon:{ select:{ code:true, type:true, value:true } } },
    });
    if (!order) return notFound("Order not found");
    if (order.userId !== userId && !["ADMIN","SUPER_ADMIN","MANAGER"].includes(role)) return forbidden();
    return ok(order);
  } catch (e) { return serverError("Failed to fetch order", e); }
}