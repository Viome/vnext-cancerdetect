import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function POST(request: NextRequest) {
    try {
        const { country, state, zipCode } = await request.json();

        if (!country || !state || !zipCode) {
            return NextResponse.json(
                { error: true, message: 'Country, state, and zipCode are required' },
                { status: 400 }
            );
        }

        if (!GOOGLE_MAPS_API_KEY) {
            return NextResponse.json(
                { error: true, message: 'Google Maps API key not configured' },
                { status: 500 }
            );
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?components=administrative_area%3A${state}%7Cpostal_code%3A${zipCode}%7Ccountry%3A${country}&key=${GOOGLE_MAPS_API_KEY}`;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.status === 'OK') {
            return NextResponse.json(
                {
                    success: true,
                    response: data,
                },
                { status: 200 }
            );
        }

        if (!response) {
            console.warn('[API /api/zip-validation] Error response:', data);
            const eventId = Sentry.captureMessage(`Error on zip validation: ${JSON.stringify(data)}`, {
                level: 'warning',
                tags: {
                    api_route: '/api/zip-validation',
                },
                extra: {
                    response: data,
                    country,
                    state,
                    zipCode,
                },
            });
            console.log('[API /api/zip-validation] Sentry event ID:', eventId);
            return NextResponse.json(
                {
                    error: true,
                    response: data,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                response: data,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('[API /api/zip-validation] Exception caught:', err);
        const eventId = Sentry.captureException(err, {
            tags: {
                api_route: '/api/zip-validation',
                http_method: 'POST',
            },
        });
        console.log('[API /api/zip-validation] Sentry event ID:', eventId);
        return NextResponse.json(
            { error: true, message: 'Internal server error' },
            { status: 400 }
        );
    }
}

