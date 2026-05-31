"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ── Helpers ──
async function getAdminSessionOrThrow() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    throw new Error("Neautorizat. Te rog să te conectezi.");
  }
  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email },
  });
  if (!admin) {
    throw new Error("Administratorul nu a fost găsit.");
  }
  return admin;
}

// Helper pentru a genera un slug valid
export async function generateValidSlug(title: string): Promise<string> {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Elimină caractere speciale nepermise
    .replace(/\s+/g, "-") // Înlocuiește spațiile cu cratimă
    .replace(/-+/g, "-") // Evită cratimele duble
    .trim();

  // Verifică unicitatea slug-ului și adaugă sufix numeric dacă e necesar
  let uniqueSlug = slug;
  let counter = 1;
  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: uniqueSlug },
    });
    if (!existing) {
      break;
    }
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

// ── CRUD Operations ──

// 1. Creare Articol
export async function createBlogPost(data: {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  published: boolean;
}) {
  try {
    const admin = await getAdminSessionOrThrow();

    if (!data.title || !data.excerpt || !data.content) {
      return { success: false, message: "Titlul, rezumatul și conținutul sunt obligatorii." };
    }

    const slug = await generateValidSlug(data.title);

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        published: data.published,
        authorId: admin.id,
      },
    });

    // Jurnalizează acțiunea
    await prisma.auditLog.create({
      data: {
        action: "BLOG_POST_CREATE",
        target: `blog_post:${post.id}`,
        ipAddress: "server",
        adminId: admin.id,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/dashboard/blog");

    return { success: true, post };
  } catch (error: any) {
    console.error("Eroare la crearea articolului:", error);
    return { success: false, message: error.message || "A apărut o eroare la crearea articolului." };
  }
}

// 2. Editare Articol
export async function updateBlogPost(
  id: string,
  data: {
    title: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    published: boolean;
  }
) {
  try {
    const admin = await getAdminSessionOrThrow();

    if (!data.title || !data.excerpt || !data.content) {
      return { success: false, message: "Titlul, rezumatul și conținutul sunt obligatorii." };
    }

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return { success: false, message: "Articolul nu a fost găsit." };
    }

    // Dacă titlul s-a schimbat, generăm un nou slug unic
    let slug = existingPost.slug;
    if (existingPost.title !== data.title) {
      slug = await generateValidSlug(data.title);
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        published: data.published,
      },
    });

    // Jurnalizează acțiunea
    await prisma.auditLog.create({
      data: {
        action: "BLOG_POST_UPDATE",
        target: `blog_post:${id}`,
        ipAddress: "server",
        adminId: admin.id,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    if (existingPost.slug !== slug) {
      revalidatePath(`/blog/${existingPost.slug}`);
    }
    revalidatePath("/dashboard/blog");

    return { success: true, post: updatedPost };
  } catch (error: any) {
    console.error("Eroare la actualizarea articolului:", error);
    return { success: false, message: error.message || "A apărut o eroare la actualizarea articolului." };
  }
}

// 3. Ștergere Articol
export async function deleteBlogPost(id: string) {
  try {
    const admin = await getAdminSessionOrThrow();

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, message: "Articolul nu a fost găsit." };
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    // Jurnalizează acțiunea
    await prisma.auditLog.create({
      data: {
        action: "BLOG_POST_DELETE",
        target: `blog_post:${id}`,
        ipAddress: "server",
        adminId: admin.id,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/dashboard/blog");

    return { success: true };
  } catch (error: any) {
    console.error("Eroare la ștergerea articolului:", error);
    return { success: false, message: error.message || "A apărut o eroare la ștergerea articolului." };
  }
}
