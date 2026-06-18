import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// camelCase를 snake_case로 변환하는 유틸리티 함수
function toSnakeCase(obj: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = value;
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // DB 컬럼에 맞게 snake_case로 변환
    const insertData = toSnakeCase(body);

    const { data, error } = await supabase
      .from('customers')
      .upsert(insertData, { onConflict: 'id' }); // id가 있으면 업데이트, 없으면 삽입

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
