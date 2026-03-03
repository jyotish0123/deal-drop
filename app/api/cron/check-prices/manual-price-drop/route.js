import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendPriceDropAlert } from "@/lib/email";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId, oldPrice, newPrice } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  const {
    data: { user },
  } = await supabase.auth.admin.getUserById(product.user_id);

  if (user?.email) {
    await sendPriceDropAlert(
      user.email,
      product,
      oldPrice,
      newPrice
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({
    message: "Manual price drop endpoint. Use POST.",
  });
}