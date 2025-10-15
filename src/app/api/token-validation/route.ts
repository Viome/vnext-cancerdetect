import { NextRequest, NextResponse } from 'next/server';
// import * as Sentry from '@sentry/nextjs';
import { API_DOMAIN_V1 } from '@/lib/utils/constants';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: true, message: 'Token is required' },
                { status: 400 }
            );
        }

        const url = `${API_DOMAIN_V1}/user/verifyToken?token=${token}`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        const { payload } = data;
        const { body, statusCodeValue } = payload || {};
        const { error, email } = body || {};

        if (!response || statusCodeValue !== 200) {
            // Sentry.captureMessage(`Error on token validation: ${JSON.stringify(data)}`);
            return NextResponse.json(
                {
                    error: true,
                    message: 'Error, Our team is working on a fix',
                    response: data,
                },
                { status: 200 }
            );
        }

        if (!error && error !== 'cd-0028') {
            return NextResponse.json(
                {
                    validToken: true,
                    userEmail: email,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                validToken: false,
                message: 'Error token not valid',
            },
            { status: 403 }
        );
    } catch (err) {
        // Sentry.captureException(err);
        return NextResponse.json(
            { error: true, message: 'Internal server error' },
            { status: 400 }
        );
    }
}

