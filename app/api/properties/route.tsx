import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), "public/data/properties.json");
    const jsonData = await fs.promises.readFile(filePath, "utf-8");
    const properties = JSON.parse(jsonData);

    return NextResponse.json(properties); // Return JSON response
  } catch {
    return NextResponse.json(
      { error: "Failed to load properties" },
      { status: 500 }
    );
  }
}
