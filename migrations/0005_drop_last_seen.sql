-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "image" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pet" ("breed", "createdAt", "date", "id", "image", "latitude", "longitude", "name", "type", "updatedAt") SELECT "breed", "createdAt", "date", "id", "image", "latitude", "longitude", "name", "type", "updatedAt" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE INDEX "Pet_type_idx" ON "Pet"("type");
CREATE INDEX "Pet_date_idx" ON "Pet"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
