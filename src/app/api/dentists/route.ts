import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
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
            console.warn('[API /api/dentists] Error response received:', data);
            const eventId = Sentry.captureMessage('DENTIST: Error, Our team is working on a fix', {
                level: 'warning',
                tags: {
                    api_route: '/api/dentists',
                },
                extra: {
                    response: data,
                },
            });
            console.log('[API /api/dentists] Sentry event ID:', eventId);
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

        console.error('[API /api/dentists] Error getting dentists');
        const eventId = Sentry.captureMessage('DENTIST: Error getting dentists', {
            level: 'error',
            tags: {
                api_route: '/api/dentists',
            },
        });
        console.log('[API /api/dentists] Sentry event ID:', eventId);
        return NextResponse.json(
            {
                error: true,
                message: 'Error getting dentists',
            },
            { status: 403 }
        );
    } catch (err) {
        console.error('[API /api/dentists] Exception caught:', err);
        const eventId = Sentry.captureException(err, {
            tags: {
                api_route: '/api/dentists',
                http_method: 'POST',
            },
        });
        console.log('[API /api/dentists] Sentry event ID:', eventId);
        return NextResponse.json(
            { error: true, message: 'Internal server error' },
            { status: 400 }
        );
    }
}

