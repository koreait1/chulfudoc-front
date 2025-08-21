import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  if (!request.cookies.get('User-Hash')?.value) {
    response.cookies.set('User-Hash', '' + Date.now())
  }
  return response
}