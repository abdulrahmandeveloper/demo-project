import { tmdbApi } from "@/shared/lib/axios/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query");

  try {
    const tmdbRes = await tmdbApi.get("/tv/top_rated", {
      params: {
        page: page ?? 1,
        language: "en-US",
      },
    });

    const data = tmdbRes.data;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch series",
      },
      { status: 400 }
    );
  }
}
