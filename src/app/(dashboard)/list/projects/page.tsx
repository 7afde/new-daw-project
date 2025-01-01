import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { Prisma, Project, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";

type ProjectList = Project & { teacher: Teacher };

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Domain",
    accessor: "domain",
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

const renderRow = (item: ProjectList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="p-4 font-semibold">{item.title}</td>
    <td className="hidden md:table-cell">
      {item.teacher?.name || "No Teacher Assigned"}
    </td>
    <td className="hidden lg:table-cell">{item.domain}</td>
    <td>
      <span
        className={`py-1 px-3 rounded-full text-xs ${
          item.status === "OPEN"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {item.status}
      </span>
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/projects/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        <FormModal table="project" type="edit" id={item.id} />
      </div>
    </td>
  </tr>
);

const ProjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.ProjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          case "status":
            query.status = value as any;
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.project.findMany({
      where: query,
      include: { teacher: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.project.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 relative rounded-md flex-1 m-4 mt-0 flex flex-col justify-between h-full">
      {/* TOP */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            All Projects
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
              <FormModal table="project" type="create" />
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

export default ProjectListPage;
