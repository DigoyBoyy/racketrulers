import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function parseArgs(argv: string[]) {
  if (argv.includes('--help') || argv.includes('-h')) {
    return { help: true, newSlug: '', fromSlug: undefined as string | undefined };
  }

  const nonFlags = argv.filter((arg) => !arg.startsWith('--'));
  const newSlug = nonFlags.join(' ').trim();
  const fromFlag = argv.find((arg) => arg.startsWith('--from='));
  const fromSlug = fromFlag?.slice('--from='.length).trim() || undefined;

  return { help: false, newSlug, fromSlug };
}

function printUsage() {
  console.log('Usage: npm run db:coach:slug -- new-slug [--from=current-slug]');
  console.log('Example: npm run db:coach:slug -- coach-maria --from=coach-john');
}

function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

async function main() {
  const { help, newSlug, fromSlug } = parseArgs(process.argv.slice(2));

  if (help) {
    printUsage();
    return;
  }

  if (!newSlug) {
    console.error('Missing new slug.');
    printUsage();
    process.exit(1);
  }

  if (!isValidSlug(newSlug)) {
    console.error('Invalid slug format. Use lowercase letters, numbers, and hyphens only.');
    process.exit(1);
  }

  const target = fromSlug
    ? await prisma.coachProfile.findUnique({ where: { slug: fromSlug } })
    : await prisma.coachProfile.findFirst({ orderBy: { createdAt: 'asc' } });

  if (!target) {
    console.error(
      fromSlug
        ? `No coach profile found for slug: ${fromSlug}`
        : 'No coach profile found. Create one before running this script.'
    );
    process.exit(1);
  }

  if (target.slug === newSlug) {
    console.log(`Slug is already set to: ${newSlug}`);
    return;
  }

  const duplicate = await prisma.coachProfile.findUnique({ where: { slug: newSlug } });
  if (duplicate) {
    console.error(`Slug already in use: ${newSlug}`);
    process.exit(1);
  }

  const updated = await prisma.coachProfile.update({
    where: { id: target.id },
    data: { slug: newSlug },
  });

  console.log(`Updated coach slug to: ${updated.slug} (name: ${updated.displayName})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });