import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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
      .from('contact_messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      
      // Check if the error is due to missing table
      if (error.message?.includes('relation "contact_messages" does not exist')) {
        return NextResponse.json(
          { error: 'The contact system is not properly set up. Please contact the administrator.' },
          { status: 500 }
        );
      }
      
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      data 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 