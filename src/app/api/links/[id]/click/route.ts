import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  if (!links.some((link) => link.id === params.id)) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }
  try {
    const db = await getDatabase();
    if (!db) {
      return NextResponse.json({ recorded: false, error: "클릭 저장소가 설정되지 않았습니다." }, { status: 503 });
    }
    const record = await db.collection<{ _id: string; clicks: number; updatedAt: Date }>("link_clicks").findOneAndUpdate(
      { _id: params.id },
      { $inc: { clicks: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ recorded: true, clicks: record!.clicks });
  } catch {
    console.error("링크 클릭 기록에 실패했습니다.");
    return NextResponse.json({ recorded: false, error: "클릭 기록에 실패했습니다." }, { status: 503 });
  }
}
