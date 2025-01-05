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
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormContainer from "@/components/FormContainer";
import { date } from "zod";

type TeacherList = Teacher & { projects: Project[] } & { groups: Group[] };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Projects",
    accessor: "project",
    className: "hidden md:table-cell",
  },
  {
    header: "Specialization",
    accessor: "specialization",
    className: "hidden md:table-cell",
  },
  // {
  //   header: "Classes",
  //   accessor: "classes",
  //   className: "hidden md:table-cell",
  // },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  // {
  //   header: "Address",
  //   accessor: "address",
  //   className: "hidden lg:table-cell",
  // },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">
          {item.name} {item.surname}
        </h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.projects.map((project) => project.title).join(",") ||
        "No Projects assigned"}
    </td>
    {/* <td className="hidden md:table-cell">{item.classes.join(",")}</td> */}
    <td className="hidden md:table-cell">{item.specialization}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <FormContainer table="teacher" type="update" data={teachersData} />
        )}
        {role === "admin" && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          //   <Image src="/delete.png" alt="" width={16} height={16} />
          // </button>
          <FormContainer table="teacher" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "projectId":
            query.projects = {
              some: {
                id: value,
              },
            };
            break;
          case "specialization":
            query.specialization = value as Specialization;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        projects: true,
        groups: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 relative rounded-md flex-1 m-4 mt-0 flex flex-col justify-between h-full">
      {/* TOP */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            All Teachers
          </h1>
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
                <FormContainer table="teacher" type="create" />
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

export default TeacherListPage;
