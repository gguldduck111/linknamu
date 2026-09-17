import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    if (!db) {
      return NextResponse.json({ error: "클릭 저장소가 설정되지 않았습니다." }, { status: 503 });
    }
    const records = await db.collection<{ _id: string; clicks: number }>("link_clicks")
      .find({ _id: { $in: links.map((link) => link.id) } }, { projection: { clicks: 1 } })
      .toArray();
    const clicks = Object.fromEntries(links.map((link) => [link.id, 0]));
    for (const record of records) clicks[record._id] = record.clicks;
    return NextResponse.json({ clicks }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("링크 클릭 수 조회에 실패했습니다.");
    return NextResponse.json({ error: "클릭 수 조회에 실패했습니다." }, { status: 503 });
  }
}
