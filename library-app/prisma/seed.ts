import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

// 10件の本のサンプルデータ
const books = [
  { title: "吾輩は猫である", isAvailable: true },
  { title: "坊っちゃん", isAvailable: true },
  { title: "こころ", isAvailable: false },
  { title: "走れメロス", isAvailable: true },
  { title: "銀河鉄道の夜", isAvailable: false },
  { title: "羅生門", isAvailable: true },
  { title: "人間失格", isAvailable: true },
  { title: "雪国", isAvailable: false },
  { title: "風の又三郎", isAvailable: true },
  { title: "ノルウェイの森", isAvailable: true },
];

async function main() {
  console.log("🌱 シードデータの投入を開始します...");

  // 既存のデータを削除（クリーンな状態から始める）
  await prisma.book.deleteMany();
  console.log("📚 既存の本データを削除しました");

  // 本のデータを一括作成
  const createdBooks = await prisma.book.createMany({
    data: books,
  });

  console.log(`✅ ${createdBooks.count}件の本データを投入しました`);

  // 投入したデータを確認
  const allBooks = await prisma.book.findMany();
  console.log("\n📖 投入されたデータ一覧:");
  allBooks.forEach((book, index) => {
    const status = book.isAvailable ? "貸出可" : "貸出中";
    console.log(`  ${index + 1}. ${book.title} [${status}]`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ シードでエラーが発生しました:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

