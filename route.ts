src/app/api/objections/route.ts







import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET handler - fetch all custom objections for the current user
export async function GET(req: NextRequest) {
  try {
    // Get member ID from query parameters
    const url = new URL(req.url);
    const memberId = url.searchParams.get('memberId') || req.headers.get('x-member-id');
    
    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    const { rows } = await sql`
      SELECT id, objection_text, created_at
      FROM custom_objections
      WHERE member_id = ${memberId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ objections: rows });
  } catch (error) {
    console.error('Error fetching objections:', error);
    return NextResponse.json({ error: 'Failed to fetch objections' }, { status: 500 });
  }
}

// POST handler - create a new custom objection
export async function POST(req: NextRequest) {
  try {
    // Get data from the request
    const { objectionText, memberId, teamId } = await req.json();
    
    if (!objectionText || typeof objectionText !== 'string' || objectionText.trim() === '') {
      return NextResponse.json({ error: 'Objection text is required' }, { status: 400 });
    }

    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    // If teamId is provided, include it in the insert
    const { rows } = teamId 
      ? await sql`
          INSERT INTO custom_objections (member_id, team_id, objection_text)
          VALUES (${memberId}, ${teamId}, ${objectionText})
          RETURNING id, objection_text, created_at
        `
      : await sql`
          INSERT INTO custom_objections (member_id, objection_text)
          VALUES (${memberId}, ${objectionText})
          RETURNING id, objection_text, created_at
        `;

    return NextResponse.json({ objection: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating objection:', error);
    return NextResponse.json({ error: 'Failed to create objection' }, { status: 500 });
  }
}

// DELETE handler - remove a custom objection
export async function DELETE(req: NextRequest) {
  try {
    // Get parameters from the URL
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const memberId = url.searchParams.get('memberId') || req.headers.get('x-member-id');
    
    if (!id) {
      return NextResponse.json({ error: 'Objection ID is required' }, { status: 400 });
    }

    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    // Verify the objection belongs to the user before deleting
    const { rowCount } = await sql`
      DELETE FROM custom_objections
      WHERE id = ${id} AND member_id = ${memberId}
    `;

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Objection not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting objection:', error);
    return NextResponse.json({ error: 'Failed to delete objection' }, { status: 500 });
  }
}
