import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import prisma from "@/lib/prisma";
import {
  Group,
  Prisma,
  Project,
  Specialization,
  Teacher,
  Student,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";

// type TeacherList = Teacher & { projects: Project[] } & { groups: Group[] };
type GroupList = Group & { project: Project } & { teacher: Teacher } & {
  Student: Student[];
};

const columns = [
  {
    header: "group",
    accessor: "group",
  },
  {
    header: "project",
    accessor: "project",
    className: "hidden md:table-cell",
  },
  // {
  //   header: "members",
  //   accessor: "members",
  //   className: "hidden md:table-cell",
  // },

  {
    header: "teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: GroupList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <td className="md:table-cell">
          {item.Student && item.Student.length > 0
            ? item.Student.map((student) => (
                <div key={student.id}>{student.name}</div>
              ))
            : "No Student assigned"}
        </td>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.project?.title || "No Project Assigned"}
    </td>
    {/* <td className="hidden md:table-cell">{item.classes.join(",")}</td> */}
    <td className=" md:table-cell">
      {item.teacher?.surname || "No Teacher Assigned"}
    </td>
    <td>
      <span>{item.status ? "pending" : "pending"}</span>
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table="class" type="delete" id={Number(item.id)} />
        )}
      </div>
    </td>
  </tr>
);

const GroupListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.GroupWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "applicationId":
            query.applications = {
              some: {
                id: value,
              },
            };
            break;

          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.group.findMany({
      where: query,
      include: {
        members: true,
        Student: true,
        project: true,
        teacher: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.group.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 relative rounded-md flex-1 m-4 mt-0 flex flex-col justify-between h-full">
      {/* TOP */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Groups</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button>
              {role === "admin" && (
                // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                //   <Image src="/plus.png" alt="" width={14} height={14} />
                // </button>
                <FormModal table="teacher" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>

      {/* PAGINATION */}

      <Pagination page={p} count={count} />
    </div>
  );
};

export default GroupListPage;

/// implement group page and get them from the db , like the page above it " projects"
