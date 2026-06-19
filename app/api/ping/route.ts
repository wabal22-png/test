import { NextResponse } from "next/server";

/**
 * Supabase 무료 플랜 일시정지 방지용 Ping API
 *
 * Vercel Cron이 매일 이 엔드포인트를 호출하여
 * Supabase 프로젝트에 가벼운 HEAD 요청을 보냅니다.
 * 이를 통해 1주일 비활성 → 자동 일시정지를 방지합니다.
 */

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return NextResponse.json(
      { ok: false, error: "SUPABASE_URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(supabaseUrl, { method: "HEAD" });

    return NextResponse.json({
      ok: true,
      status: response.status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
