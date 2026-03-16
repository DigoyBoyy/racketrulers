import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function parseArgs(argv: string[]) {
  if (argv.includes('--help') || argv.includes('-h')) {
    return { help: true, name: '', slug: undefined as string | undefined };
  }

  const nonFlags = argv.filter((arg) => !arg.startsWith('--'));
  const name = nonFlags.join(' ').trim();
  const slugFlag = argv.find((arg) => arg.startsWith('--slug='));
  const slug = slugFlag?.slice('--slug='.length).trim() || undefined;

  return { help: false, name, slug };
}

function printUsage() {
  console.log('Usage: npm run db:coach:name -- "New Coach Name" [--slug=coach-slug]');
  console.log('Example: npm run db:coach:name -- "Coach Maria" --slug=coach-john');
}

async function main() {
  const { help, name, slug } = parseArgs(process.argv.slice(2));

  if (help) {
    printUsage();
    return;
  }

  if (!name) {
    console.error('Missing coach name.');
    printUsage();
    process.exit(1);
  }

  const existing = slug
    ? await prisma.coachProfile.findUnique({ where: { slug } })
    : await prisma.coachProfile.findFirst({ orderBy: { createdAt: 'asc' } });

  if (!existing) {
    console.error(
      slug
        ? `No coach profile found for slug: ${slug}`
        : 'No coach profile found. Create one before running this script.'
    );
    process.exit(1);
  }

  const updated = await prisma.coachProfile.update({
    where: { id: existing.id },
    data: { displayName: name },
  });

  console.log(`Updated coach name to: ${updated.displayName} (slug: ${updated.slug})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });