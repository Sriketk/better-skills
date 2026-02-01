import { type NextRequest, NextResponse } from "next/server";

interface ValidationError {
  path: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  feed?: {
    name: string;
    skillCount: number;
    version: string;
  };
}

// Top-level regex for version validation
const VERSION_PATTERN = /^\d+\.\d+$/;

function validateSkill(
  skill: unknown,
  index: number,
  errors: ValidationError[]
): void {
  if ( typeof skill !== "object" || skill === null ) {
    errors.push( {
      path: `skills[${index}]`,
      message: "skill must be an object",
    } );
    return;
  }

  const s = skill as Record<string, unknown>;

  if ( typeof s.id !== "string" || s.id.length === 0 ) {
    errors.push( { path: `skills[${index}].id`, message: "id is required" } );
  }

  if ( typeof s.name !== "string" || s.name.length === 0 ) {
    errors.push( {
      path: `skills[${index}].name`,
      message: "name is required",
    } );
  }

  if ( typeof s.version !== "string" ) {
    errors.push( {
      path: `skills[${index}].version`,
      message: "version is required",
    } );
  }

  if ( typeof s.updated_at !== "string" ) {
    errors.push( {
      path: `skills[${index}].updated_at`,
      message: "updated_at is required",
    } );
  }

  if ( typeof s.content_url !== "string" || s.content_url.length === 0 ) {
    errors.push( {
      path: `skills[${index}].content_url`,
      message: "content_url is required",
    } );
  }

  // Optional field validation
  if ( s.tags !== undefined && !Array.isArray( s.tags ) ) {
    errors.push( {
      path: `skills[${index}].tags`,
      message: "tags must be an array of strings",
    } );
  }

  if ( s.triggers !== undefined && !Array.isArray( s.triggers ) ) {
    errors.push( {
      path: `skills[${index}].triggers`,
      message: "triggers must be an array of strings",
    } );
  }

  if ( s.dependencies !== undefined && !Array.isArray( s.dependencies ) ) {
    errors.push( {
      path: `skills[${index}].dependencies`,
      message: "dependencies must be an array of strings",
    } );
  }
}

function validateFeed( data: unknown ): ValidationResult {
  const errors: ValidationError[] = [];

  if ( typeof data !== "object" || data === null ) {
    return {
      valid: false,
      errors: [ { path: "", message: "Feed must be an object" } ],
    };
  }

  const feed = data as Record<string, unknown>;

  // Required fields
  if ( typeof feed.version !== "string" ) {
    errors.push( {
      path: "version",
      message: "version is required and must be a string",
    } );
  } else if ( !VERSION_PATTERN.test( feed.version ) ) {
    errors.push( {
      path: "version",
      message: "version must match pattern X.Y (e.g., 1.0)",
    } );
  }

  if ( typeof feed.name !== "string" || feed.name.length === 0 ) {
    errors.push( {
      path: "name",
      message: "name is required and must be a non-empty string",
    } );
  }

  if ( typeof feed.updated_at !== "string" ) {
    errors.push( {
      path: "updated_at",
      message: "updated_at is required and must be an ISO 8601 timestamp",
    } );
  }

  if ( Array.isArray( feed.skills ) ) {
    for ( let i = 0; i < feed.skills.length; i++ ) {
      validateSkill( feed.skills[ i ], i, errors );
    }
  } else {
    errors.push( {
      path: "skills",
      message: "skills is required and must be an array",
    } );
  }

  if ( errors.length > 0 ) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    feed: {
      name: feed.name as string,
      skillCount: ( feed.skills as unknown[] ).length,
      version: feed.version as string,
    },
  };
}

export async function POST( request: NextRequest ) {
  try {
    const body = await request.json();
    const result = validateFeed( body );

    return NextResponse.json( result, {
      status: result.valid ? 200 : 400,
    } );
  } catch {
    return NextResponse.json(
      {
        valid: false,
        errors: [ { path: "", message: "Invalid JSON" } ],
      },
      { status: 400 }
    );
  }
}

export async function GET( request: NextRequest ) {
  const url = request.nextUrl.searchParams.get( "url" );

  if ( !url ) {
    return NextResponse.json(
      { error: "url parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch( url, {
      headers: { Accept: "application/json" },
    } );

    if ( !response.ok ) {
      return NextResponse.json(
        {
          valid: false,
          errors: [
            {
              path: "",
              message: `Failed to fetch: ${response.status} ${response.statusText}`,
            },
          ],
        },
        { status: 400 }
      );
    }

    const data = await response.json();
    const result = validateFeed( data );

    return NextResponse.json( result, {
      status: result.valid ? 200 : 400,
    } );
  } catch ( error ) {
    return NextResponse.json(
      {
        valid: false,
        errors: [
          {
            path: "",
            message: `Failed to fetch or parse feed: ${( error as Error ).message}`,
          },
        ],
      },
      { status: 400 }
    );
  }
}
