import { NextRequest, NextResponse } from 'next/server';

const API_DOMAIN_V1 = process.env.NEXT_PUBLIC_API_DOMAIN_V1;

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const { searchParams } = new URL(request.url);
        const orderType = searchParams.get('order_type');  
        const url = `${API_DOMAIN_V1}/user/generateToken/${email}?order_type=${orderType}`;
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

        const { payload } = data;
        const {
            existing_user: existingUser,
            error,
            message,
        } = payload || {};

        if (!response || response.status !== 200) {
            return NextResponse.json(
                {
                    error: true,
                    message: 'Error, Our team is working on a fix',
                },
                { status: 200 },
            );
        }

        if (existingUser) {
            return NextResponse.json(
                {
                    success: true,
                    existingUser: true,
                    response,
                },
                { status: 200 },
            );
        }

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    error: true,
                    message: `Error: ${message} (${error}) `,
                    retry: true,
                    response,
                },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                existingUser: false,
                response,
            },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json(
            { error: true, message: 'Internal server error' },
            { status: 400 },
        );
    }
}

