import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log('유입')

    return NextResponse.json({})
}