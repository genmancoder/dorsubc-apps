"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState, useRef } from "react";
import Papa from "papaparse";
import * as htmlToImage from "html-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Page() {
  const [data, setData] = useState<string[]>([]);
  const qrRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results: Papa.ParseResult<string[]>) => {
        const rows = results.data as string[][];
        // Assuming first column values to be encoded
        const values = rows.map((row) => row[0]).filter(Boolean);
        setData(values);
      },
    });
  };

  const downloadQR = async (value: string) => {
    const node = qrRefs.current[value];
    if (!node) return;

    const dataUrl = await htmlToImage.toPng(node);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${sanitizeFilename(value)}.png`;
    link.click();
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder("qr-codes");

    for (const value of data) {
      const node = qrRefs.current[value];
      if (!node) continue;

      const dataUrl = await htmlToImage.toPng(node);
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
      folder?.file(`${sanitizeFilename(value)}.png`, base64, { base64: true });
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "all-qr-codes.zip");
  };

  const sanitizeFilename = (name: string) =>
    name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").slice(0, 100);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Creating QR Code</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Batch Processing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
              CSV to QR Code Generator
            </h1>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            {data.length > 0 && (
              <button
                onClick={downloadAll}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Download All QR Codes (ZIP)
              </button>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {data.map((value, index) => (
                <div key={index} className="p-2 border rounded text-center">
                  <p className="mt-2 text-sm break-all">{value}</p>
                  <button
                    onClick={() => downloadQR(value)}
                    className="mt-2 text-sm text-blue-600 underline"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
