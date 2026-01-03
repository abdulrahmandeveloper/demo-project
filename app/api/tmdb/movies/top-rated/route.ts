// app/api/tmdb/movies/top-rated/route.ts  ← Note: use top-rated, not top_rated
import { tmdbApi } from "@/shared/lib/axios/axios";
import { NextRequest, NextResponse } from "next/server";

// ✅ Must be uppercase "GET", not "Get"
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "1"; // ✅ Default to "1"
  const query = searchParams.get("query");

  try {
    // ✅ Correct path structure
    const tmdbRes = await tmdbApi.get("/movie/top_rated", {
      params: {
        page: page ?? 1,
        language: "en-US",
      },
    });

    const data = tmdbRes.data;

    // ✅ Use NextResponse, not res.status()
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch movies",
      },
      { status: 400 } // ✅ Proper error status
    );
  }
}
