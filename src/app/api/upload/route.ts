import fs from "fs";
import path from "path";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { UploadedReferenceFile } from "@/types/kols";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB max per file
const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".pdf",
  ".dwg",
  ".dxf",
  ".zip",
]);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided for upload." },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uploadedResults: UploadedReferenceFile[] = [];

    for (const file of files) {
      if (!file || typeof file.arrayBuffer !== "function") continue;

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            error: `File "${file.name}" exceeds the 15MB maximum size limit.`,
          },
          { status: 400 }
        );
      }

      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          {
            error: `File type "${ext || "unknown"}" is not permitted. Allowed formats: PDF, PNG, JPG, WEBP, SVG, DWG, DXF, ZIP.`,
          },
          { status: 400 }
        );
      }

      const safeBase = path
        .basename(file.name, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .slice(0, 48);
      const uniqueId = crypto.randomBytes(6).toString("hex");
      const storedName = `${Date.now()}-${uniqueId}-${safeBase}${ext}`;
      const filePath = path.join(uploadsDir, storedName);

      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      uploadedResults.push({
        id: `file-${uniqueId}`,
        originalName: file.name,
        storedName,
        url: `/uploads/${storedName}`,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size,
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedResults,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file upload." },
      { status: 500 }
    );
  }
}
