#!/bin/bash

echo "=============================="
echo "🎯 Prisma Command Reference"
echo "=============================="

echo ""
echo "👉 STEP 1: Format your schema (run anytime after editing schema.prisma)"
echo "   $ npx prisma format"
npx prisma format

echo ""
echo "👉 STEP 2: Generate the Prisma Client (run after format or if client code is missing)"
echo "   $ npx prisma generate"
npx prisma generate

echo ""
echo "👉 STEP 3: Create a new migration (change 'migration_name' as needed)"
echo "   $ npx prisma migrate dev --name migration_name"
read -p "Enter migration name: " MIGRATION_NAME
npx prisma migrate dev --name "$MIGRATION_NAME"

echo ""
echo "✅ DONE: Schema formatted, client generated, and migration created."
