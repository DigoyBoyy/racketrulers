import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create an organizer user
  const hashedPassword = await hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Organizer Admin',
      email: 'admin@racketdb.com',
      password: hashedPassword,
      emailVerified: new Date(),
      role: 'ADMIN',
    },
  });

  console.log('Created user:', user.email);

  // Create a sample tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: 'Sample Tournament 2026',
      slug: 'sample-2026',
      description: 'A sample tournament for testing',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-04-02'),
      ownerId: user.id,
      format: 'ROUND_ROBIN',
      pointsConfig: { win: 3, draw: 1, loss: 0 },
      scoringConfig: { pointsPerSet: 21, totalSets: 3, deuceEnabled: true, maxPoints: 30 },
    },
  });

  console.log('Created tournament:', tournament.name);

  // Create a location for the tournament
  const location = await prisma.location.create({
    data: {
      name: 'Main Court',
      tournamentId: tournament.id,
    },
  });

  console.log('Created location:', location.name);

  // Create participants
  const participants = await Promise.all([
    prisma.participant.create({
      data: {
        name: 'Team Alpha',
        captainName: 'Alice Johnson',
        captainEmail: 'alice@example.com',
        tournamentId: tournament.id,
        seed: 1,
      },
    }),
    prisma.participant.create({
      data: {
        name: 'Team Beta',
        captainName: 'Bob Smith',
        captainEmail: 'bob@example.com',
        tournamentId: tournament.id,
        seed: 2,
      },
    }),
    prisma.participant.create({
      data: {
        name: 'Team Gamma',
        captainName: 'Charlie Brown',
        captainEmail: 'charlie@example.com',
        tournamentId: tournament.id,
        seed: 3,
      },
    }),
  ]);

  console.log('Created participants:', participants.length);

  // Create a coach profile
  const coach = await prisma.coachProfile.create({
    data: {
      displayName: 'Coach John',
      slug: 'coach-john',
      sessionDurationMinutes: 60,
    },
  });

  console.log('Created coach profile:', coach.displayName);

  // Create coach availability
  await prisma.coachAvailability.create({
    data: {
      dayOfWeek: 1, // Monday
      startTime: '10:00',
      endTime: '16:00',
      coachProfileId: coach.id,
    },
  });

  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
