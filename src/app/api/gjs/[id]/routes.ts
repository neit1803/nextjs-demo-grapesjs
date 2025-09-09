import { NextRequest, NextResponse } from 'next/server';

const DB: Record<string, any> = {};

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data =
    DB[params.id] ??
    { pages: [{ component: '<div>Initial</div>' }], styles: [], assets: [] };
  return NextResponse.json({ id: params.id, data });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json(); // { id, data }
  DB[params.id] = body.data;
  return NextResponse.json({ ok: true });
}
