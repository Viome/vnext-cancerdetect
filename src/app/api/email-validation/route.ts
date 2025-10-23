import { NextRequest, NextResponse } from 'next/server';

const API_DOMAIN_V1 = process.env.NEXT_PUBLIC_API_DOMAIN_V1;

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const { searchParams } = new URL(request.url);
        const orderType = searchParams.get('order_type');  
        
        if (!API_DOMAIN_V1) {
            console.error('NEXT_PUBLIC_API_DOMAIN_V1 is not defined');
            return NextResponse.json(
                {
                    error: true,
                    message: 'API configuration error',
                },
                { 
                    status: 500,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate',
                    },
                },
            );
        }

        const url = `${API_DOMAIN_V1}/user/generateToken/${email}?order_type=${orderType}`;
        console.log(`[email-validation] Calling API: ${url.replace(email, '***')}`);
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Cache-Control': 'no-cache',
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        
        console.log(`[email-validation] Response status: ${response.status}`);

        const { payload } = data;
        const {
            existing_user: existingUser,
            error,
            message,
        } = payload || {};

        if (!response || response.status !== 200) {
            console.error(`[email-validation] API error - Status: ${response?.status}`);
            return NextResponse.json(
                {
                    error: true,
                    message: 'Error, Our team is working on a fix',
                },
                { 
                    status: 200,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate',
                    },
                },
            );
        }

        if (existingUser) {
            return NextResponse.json(
                {
                    success: true,
                    existingUser: true,
                    response,
                },
                { 
                    status: 200,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate',
                    },
                },
            );
        }

        if (error) {
            console.error(`[email-validation] Error from API: ${message} (${error})`);
            return NextResponse.json(
                {
                    success: false,
                    error: true,
                    message: `Error: ${message} (${error}) `,
                    retry: true,
                    response,
                },
                { 
                    status: 404,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate',
                    },
                },
            );
        }

        return NextResponse.json(
            {
                success: true,
                existingUser: false,
                response,
            },
            { 
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            },
        );
    } catch (err) {
        console.error('[email-validation] Exception:', err);
        return NextResponse.json(
            { error: true, message: 'Internal server error' },
            { 
                status: 400,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            },
        );
    }
}

