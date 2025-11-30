import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Revalidation API endpoint for Sanity webhooks
 *
 * This endpoint allows Sanity to trigger cache revalidation when content is published.
 * It validates requests using a secret token to prevent unauthorized cache purging.
 *
 * Setup:
 * 1. Add REVALIDATE_SECRET to your .env.local file
 * 2. Configure a webhook in Sanity Studio to POST to this endpoint when content changes
 * 3. Include the secret as a query parameter: ?secret=YOUR_SECRET
 */
export async function POST(request: NextRequest) {
  // Validate secret token
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Invalid secret token" },
      { status: 401 }
    );
  }

  try {
    // Parse webhook payload to determine what to revalidate
    const body = await request.json();
    const documentType = body._type;

    // Revalidate paths based on content type
    if (documentType === "project") {
      // Revalidate all project-related pages
      revalidatePath("/");
      revalidatePath("/projects");

      // If the project slug is available, revalidate its detail page
      if (body.slug?.current) {
        revalidatePath(`/projects/${body.slug.current}`);
      }
    } else if (documentType === "homepage") {
      revalidatePath("/");
    } else if (documentType === "about") {
      revalidatePath("/about");
    } else if (documentType === "contactPageSettings") {
      revalidatePath("/contact");
    } else if (documentType === "projectsPageSettings") {
      revalidatePath("/projects");
    } else {
      // For any other content type, revalidate the homepage as a safe default
      revalidatePath("/");
    }

    return NextResponse.json({
      revalidated: true,
      message: "Cache revalidated successfully",
      documentType,
    });
  } catch (error) {
    console.error("[Revalidate API] Error:", error);
    return NextResponse.json(
      { message: "Error revalidating cache", error: String(error) },
      { status: 500 }
    );
  }
}
