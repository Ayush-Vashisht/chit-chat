import { fetchRedis } from "@/helpers/redis";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email: emailtoAdd } = await addFriendValidator.parse(body);

    const idToAdd = (await fetchRedis('get',`user:email:${emailtoAdd}`)) as string;
  } catch (error) {}
}
