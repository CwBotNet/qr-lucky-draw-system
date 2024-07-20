-- CreateTable
CREATE TABLE "Draw" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "drawDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,

    CONSTRAINT "Draw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Draw_phoneNumber_key" ON "Draw"("phoneNumber");
