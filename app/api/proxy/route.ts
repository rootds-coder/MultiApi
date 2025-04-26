import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    console.log('Proxying request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*', // Accept any content type
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Proxy error:', {
        status: response.status,
        statusText: response.statusText,
        url,
        error: errorText
      });
      return NextResponse.json({ 
        error: `API call failed with status: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || '';
    
    // Check if the response is an image or other binary data
    if (contentType.includes('image/') || 
        contentType.includes('application/octet-stream') || 
        !contentType.includes('application/json')) {
      
      // For binary responses, return them directly
      const buffer = await response.arrayBuffer();
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Length': buffer.byteLength.toString(),
        },
      });
    }

    // If the response is JSON, parse and return it
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ 
      error: 'Failed to proxy request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}