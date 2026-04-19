-- CreateTable
CREATE TABLE "ConversionEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ConversionEvent_createdAt_idx" ON "ConversionEvent"("createdAt");

-- CreateIndex
CREATE INDEX "ConversionEvent_type_idx" ON "ConversionEvent"("type");
