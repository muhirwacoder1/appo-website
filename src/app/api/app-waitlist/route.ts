import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, platform } = body;

    // Validate required fields
    if (!email || !platform) {
      return NextResponse.json(
        { error: 'Email and platform are required' },
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

    // Validate platform
    if (!['ios', 'android'].includes(platform.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid platform. Must be either iOS or Android' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('app_waitlist')
      .insert([
        {
          email: email.trim().toLowerCase(),
          platform: platform.toLowerCase()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the app waitlist',
      data 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to join the waitlist. Please try again later.' },
      { status: 500 }
    );
  }
} 