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

// snake_case를 camelCase로 변환하는 유틸리티 함수
function toCamelCase(obj: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = value;
  }
  return result;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error (GET):', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const camelData = data.map(toCamelCase);
    return NextResponse.json({ success: true, data: camelData });
  } catch (err: any) {
    console.error('API Error (GET):', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
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
      console.error('Supabase Error (POST):', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API Error (POST):', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Error (DELETE):', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API Error (DELETE):', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
