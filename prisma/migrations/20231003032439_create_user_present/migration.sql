-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Present" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlImg" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "UserPresent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "presentId" INTEGER NOT NULL,
    CONSTRAINT "UserPresent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPresent_presentId_fkey" FOREIGN KEY ("presentId") REFERENCES "Present" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPresent_userId_presentId_key" ON "UserPresent"("userId", "presentId");
