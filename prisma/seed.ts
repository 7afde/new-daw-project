import {
  PrismaClient,
  GroupStatus,
  ProjectStatus,
  NotificationType,
  UserSex,
  ApplicationStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ADMIN USERS
  const adminData = [
    {
      id: "admin1",
      username: "admin1",
    },
    {
      id: "admin2",
      username: "admin2",
    },
  ];

  for (const admin of adminData) {
    await prisma.admin.upsert({
      where: { id: admin.id },
      update: {},
      create: admin,
    });
  }

  // TEACHERS
  const teachers = [];
  for (let i = 1; i <= 5; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        email: `teacher${i}@example.com`,
        name: `TeacherFirst${i}`,
        surname: `TeacherLast${i}`,
        phone: `123-456-789${i}`,
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        specialization: i % 2 === 0 ? "GL" : "TI",
        address: `Address for Teacher ${i}`,
      },
    });
    teachers.push(teacher);
  }

  // PROJECTS
  const projects = [];
  for (let i = 1; i <= 5; i++) {
    const project = await prisma.project.create({
      data: {
        id: `project${i}`,
        title: `Project ${i}`,
        description: `Description for Project ${i}`,
        domain: `Domain ${(i % 3) + 1}`,
        technologies: `Tech ${(i % 5) + 1}`,
        keywords: `Keyword${i}`,
        status: ProjectStatus.OPEN,
        teacherId: `teacher${(i % 5) + 1}`,
      },
    });
    projects.push(project);
  }

  // GROUPS
  const groups = [];
  for (let i = 1; i <= 5; i++) {
    const group = await prisma.group.create({
      data: {
        id: `group${i}`,
        projectId: `project${i}`,
        status: GroupStatus.PENDING,
      },
    });
    groups.push(group);
  }

  // STUDENTS
  const students = [];
  for (let i = 1; i <= 10; i++) {
    const groupId = groups[i % 5]?.id;

    const student = await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `StudentFirst${i}`,
        surname: `StudentLast${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        skills: `Skill${i}`,
        sex: i % 2 === 0 ? UserSex.FEMALE : UserSex.MALE,
        groupId,
        projectId: `project${(i % 5) + 1}`,
      },
    });
    students.push(student);
  }

  // GROUP MEMBERSHIPS
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 2; j++) {
      const studentId = `student${(i - 1) * 2 + j}`;
      await prisma.groupMember.create({
        data: {
          groupId: `group${i}`,
          studentId: studentId,
        },
      });
    }
  }

  // APPLICATION CREATION
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const groupId = groups[i % 5].id; // Get corresponding group
    const projectId = student.projectId; // Ensure this is not null or undefined

    if (projectId) {
      await prisma.application.create({
        data: {
          groupId: groupId,
          projectId: projectId,
          status: ApplicationStatus.PENDING,
          submittedAt: new Date(),
        },
      });
    }
  }

  // MESSAGES
  for (let i = 1; i <= 5; i++) {
    await prisma.message.create({
      data: {
        senderId: `teacher${i}`,
        receiverId: `student${i}`,
        content: `Message content ${i}`,
        timestamp: new Date(),
      },
    });
  }

  // NOTIFICATIONS for TEACHERS
  for (let i = 0; i < teachers.length; i++) {
    const teacher = teachers[i];
    await prisma.notification.create({
      data: {
        teacherId: teacher.id,
        message: `Notification for Teacher ${teacher.username}`,
        type: NotificationType.MESSAGE,
        createdAt: new Date(),
      },
    });
  }

  // NOTIFICATIONS for STUDENTS
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    await prisma.notification.create({
      data: {
        studentId: student.id,
        message: `Notification for Student ${student.username}`,
        type: NotificationType.UPDATE,
        createdAt: new Date(),
      },
    });
  }

  // NOTIFICATIONS for ADMINS
  for (let i = 0; i < adminData.length; i++) {
    const admin = adminData[i];
    await prisma.notification.create({
      data: {
        adminId: admin.id,
        message: `Notification for Admin ${admin.username}`,
        type: NotificationType.APPLICATION,
        createdAt: new Date(),
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
