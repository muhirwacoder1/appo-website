import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: contacts, error } = await supabase
      .from('contact_messages')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching contacts.' },
      { status: 500 }
    );
  }
} 