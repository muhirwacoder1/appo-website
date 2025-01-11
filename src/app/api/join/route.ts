import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('join_requests')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Join request submitted successfully',
      data 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit join request. Please try again later.' },
      { status: 500 }
    );
  }
} 