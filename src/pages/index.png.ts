import { OGImage } from "@/lib";
import type { APIRoute } from "astro";

export const GET: APIRoute = () => OGImage("Hello, I'm Alastair!");
