import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 10 },
    update: {},
    create: {
        id: 10,
        authorId: '6',
        state: 'draft',
        isRepost: false,
        type: 'text',
        tags: ['tag1'],
        title: 'sad;sghs;asfjs',
        urlVideo: '',
        announcement: 'string',
        postText: 'string',
        quoteText: 'string',
        quoteAuthor: 'string',
        photo: 'string',
        link: 'string',
        description: 'string',
      }
  });
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  })
