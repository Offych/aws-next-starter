import { NextRequest, NextResponse } from 'next/server';
import { newProjectSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body against our schema
        const validatedData = newProjectSchema.parse(body);

        // Here you would typically save the data to your database
        // For now, we'll just log it and return a success response

        console.log('Received project data:', validatedData);

        // Example database operation (replace with your actual database logic):
        // const project = await db.projects.create({
        //   data: validatedData
        // });

        return NextResponse.json(
            {
                success: true,
                message: 'Project created successfully',
                data: validatedData
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating project:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: error.message
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Here you would typically fetch projects from your database
        // For now, we'll return an empty array

        return NextResponse.json(
            {
                success: true,
                data: []
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching projects:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
} 