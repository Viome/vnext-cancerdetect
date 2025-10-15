import { NextRequest, NextResponse } from 'next/server';
import { API_DOMAIN_V1 } from '@/lib/utils/constants';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: dentistId } = await params;

    console.log('API_DOMAIN_V1:', API_DOMAIN_V1);
    console.log('dentistId:', dentistId);

    if (!dentistId) {
        return NextResponse.json(
            { message: 'invalid dentist id' },
            { status: 400 }
        );
    }

    try {
        const url = `${API_DOMAIN_V1}/dentists/${dentistId}`;
        console.log('Fetching URL:', url);
        
        // Add timeout and signal
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            clearTimeout(timeoutId);
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                return NextResponse.json(
                    { message: `Failed to fetch dentist: ${response.statusText}` },
                    { status: response.status }
                );
            }

            const data = await response.json() as any;
            console.log('Response data:', data);
            
            const { payload } = data;

            return NextResponse.json(payload, { status: 200 });
        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            
            if (fetchError.name === 'AbortError') {
                console.error('Request timeout after 15 seconds');
                return NextResponse.json(
                    { message: 'Request timeout - API took too long to respond' },
                    { status: 504 }
                );
            }
            throw fetchError;
        }
    } catch (error: any) {
        console.error('Error fetching dentist:', error);
        console.error('Error name:', error.name);
        console.error('Error code:', error.code);
        
        // Return mock data for development if API is unreachable
        if (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.name === 'TypeError') {
            console.warn('API unreachable, returning mock data for development');
            return NextResponse.json({
                id: dentistId,
                first_name: 'John',
                last_name: 'Doe',
                practice_name: 'Sample Dental Practice',
                // Add other mock fields as needed
            }, { status: 200 });
        }
        
        return NextResponse.json(
            { message: 'Failed to fetch dentist data', error: String(error) },
            { status: 500 }
        );
    }
}

