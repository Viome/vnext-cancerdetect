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

        const url = `${API_DOMAIN_V1}/dentists/getAll?token=${token}`;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        const { payload, error } = data;
        const { dentists } = payload || {};

        if (!response || error) {
            // Sentry.captureMessage('DENTIST: Error, Our team is working on a fix');
            return NextResponse.json(
                {
                    error: true,
                    message: 'Error, Our team is working on a fix',
                    response: data,
                },
                { status: 200 }
            );
        }

        if (!error) {
            return NextResponse.json(
                {
                    dentists,
                },
                { status: 200 }
            );
        }

        // Sentry.captureMessage('DENTIST: Error getting dentists');
        return NextResponse.json(
            {
                error: true,
                message: 'Error getting dentists',
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

