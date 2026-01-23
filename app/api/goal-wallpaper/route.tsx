import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

interface GoalParams {
  title: string;
  start: Date;
  end: Date;
  type: "progress" | "countdown";
  style: "dots" | "blocks" | "bars";
  width: number;
  height: number;
}

function parseParams(searchParams: URLSearchParams): GoalParams | null {
  const title = searchParams.get("title")?.trim();
  const startStr = searchParams.get("start");
  const endStr = searchParams.get("end");
  const type = (searchParams.get("type") || "progress") as "progress" | "countdown";
  const style = (searchParams.get("style") || "dots") as "dots" | "blocks" | "bars";
  const width = parseInt(searchParams.get("width") || "1290", 10);
  const height = parseInt(searchParams.get("height") || "2796", 10);

  if (!title || !startStr || !endStr) {
    return null;
  }

  const start = new Date(startStr + "T00:00:00Z");
  const end = new Date(endStr + "T23:59:59Z");

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return null;
  }

  return { title, start, end, type, style, width, height };
}

function calculateProgress(start: Date, end: Date): {
  totalDays: number;
  daysElapsed: number;
  daysRemaining: number;
  progress: number;
  isComplete: boolean;
} {
  // Use UTC methods to avoid timezone issues
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const startDate = new Date(start);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setUTCHours(0, 0, 0, 0);

  // Calculate total days: difference in days + 1 (inclusive of both start and end)
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const totalDays = Math.floor(diffDays) + 1; // Inclusive counting: Jan 1 to Dec 31 = 365 days
  
  let daysElapsed = 0;
  if (today >= startDate) {
    if (today > endDate) {
      daysElapsed = totalDays;
    } else {
      const elapsedMs = today.getTime() - startDate.getTime();
      const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
      daysElapsed = Math.floor(elapsedDays) + 1; // Inclusive: day 1 is the start date
    }
  }

  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const progress = Math.min(1, Math.max(0, daysElapsed / totalDays));
  const isComplete = today > endDate;

  return { totalDays, daysElapsed, daysRemaining, progress, isComplete };
}

function renderErrorImage(message: string, width: number, height: number): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#ef4444",
          }}
        >
          Error
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#888888",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          {message}
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}

function renderProgressGrid(
  title: string,
  progress: number,
  totalDays: number,
  daysElapsed: number,
  isComplete: boolean,
  width: number,
  height: number,
  style: "dots" | "blocks" | "bars"
): ImageResponse {
  const gridCols = 10;
  const gridRows = Math.ceil(totalDays / gridCols);
  const filledCount = Math.floor(progress * totalDays);
  
  // Truncate title if too long
  const displayTitle = title.length > 40 ? title.substring(0, 37) + "..." : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui",
          padding: "80px",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "60px",
            textAlign: "center",
            color: "#ffffff",
            maxWidth: "1000px",
          }}
        >
          {displayTitle}
        </div>

        {/* Progress Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            maxWidth: "1000px",
            marginBottom: "40px",
          }}
        >
          {Array.from({ length: totalDays }).map((_, i) => {
            const isFilled = i < filledCount;
            const size = style === "dots" ? "24px" : style === "blocks" ? "40px" : "60px";
            const borderRadius = style === "dots" ? "50%" : "8px";
            
            return (
              <div
                key={i}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: isFilled ? "#ffffff" : "#333333",
                  borderRadius,
                  border: isFilled ? "none" : "2px solid #555555",
                }}
              />
            );
          })}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            fontSize: "32px",
            color: "#888888",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            {`${daysElapsed} / ${totalDays} days`}
          </div>
          {isComplete ? (
            <div
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                color: "#ffffff",
                marginTop: "20px",
                display: "flex",
              }}
            >
              Goal Complete! 🎉
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}

function renderCountdown(
  title: string,
  daysRemaining: number,
  isComplete: boolean,
  width: number,
  height: number
): ImageResponse {
  const displayTitle = title.length > 40 ? title.substring(0, 37) + "..." : title;
  const daysRemainingStr = String(daysRemaining);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui",
          padding: "80px",
        }}
      >
        {isComplete ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "200px",
                fontWeight: "bold",
                marginBottom: "40px",
                color: "#ffffff",
                display: "flex",
              }}
            >
              0
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "60px",
                color: "#ffffff",
                display: "flex",
              }}
            >
              DAYS LEFT
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
                maxWidth: "1000px",
                display: "flex",
              }}
            >
              {displayTitle}
            </div>
            <div
              style={{
                fontSize: "48px",
                marginTop: "40px",
                color: "#888888",
                display: "flex",
              }}
            >
              Goal Complete! 🎉
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "280px",
                fontWeight: "bold",
                marginBottom: "40px",
                color: "#ffffff",
                lineHeight: "1",
                display: "flex",
              }}
            >
              {daysRemainingStr}
            </div>
            <div
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                marginBottom: "80px",
                color: "#888888",
                letterSpacing: "4px",
                display: "flex",
              }}
            >
              DAYS LEFT
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
                maxWidth: "1000px",
                display: "flex",
              }}
            >
              {displayTitle}
            </div>
          </div>
        )}
      </div>
    ),
    {
      width,
      height,
    }
  );
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = parseParams(searchParams);

    if (!params) {
      return new NextResponse(
        renderErrorImage("Invalid parameters. Required: title, start (YYYY-MM-DD), end (YYYY-MM-DD)", 1290, 2796).body,
        {
          status: 400,
          headers: {
            "Content-Type": "image/png",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=3600",
          },
        }
      );
    }

    const { totalDays, daysElapsed, daysRemaining, progress, isComplete } = calculateProgress(
      params.start,
      params.end
    );

    let imageResponse: ImageResponse;

    if (params.type === "countdown") {
      imageResponse = renderCountdown(
        params.title,
        daysRemaining,
        isComplete,
        params.width,
        params.height
      );
    } else {
      imageResponse = renderProgressGrid(
        params.title,
        progress,
        totalDays,
        daysElapsed,
        isComplete,
        params.width,
        params.height,
        params.style
      );
    }

    return new NextResponse(imageResponse.body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating goal wallpaper:", error);
    return new NextResponse(
      renderErrorImage("Internal server error", 1290, 2796).body,
      {
        status: 500,
        headers: {
          "Content-Type": "image/png",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
