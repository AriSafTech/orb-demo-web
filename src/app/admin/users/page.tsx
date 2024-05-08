import { DataTable } from "@/components/custom/DataTable";
import { columns, User } from "./Columns";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      name: "John Smith",
      email: "john@example.com",
      phone: "123456789",
      userId: "john_doe",
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "987654321",
      userId: "jane_doe",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "5551234567",
      userId: "mike_brown",
    },
    {
      name: "Emily Johnson",
      email: "emily@example.com",
      phone: "777888999",
      userId: "emily85",
    },
    {
      name: "David Jones",
      email: "david@example.com",
      phone: "333444555",
      userId: "david_jones",
    },
    {
      name: "Amy Smith",
      email: "amy@example.com",
      phone: "111222333",
      userId: "amy_smith",
    },
    {
      name: "Chris Evans",
      email: "chris@example.com",
      phone: "444555666",
      userId: "chris123",
    },
    {
      name: "Anna Williams",
      email: "anna@example.com",
      phone: "999888777",
      userId: "anna99",
    },
    {
      name: "Kevin Lee",
      email: "kevin@example.com",
      phone: "666777888",
      userId: "kev123",
    },
    {
      name: "Lisa Johnson",
      email: "lisa@example.com",
      phone: "888999000",
      userId: "lisa_k",
    },
    {
      name: "Robert Smith",
      email: "robert@example.com",
      phone: "222333444",
      userId: "rob_smith",
    },
    {
      name: "Sarah Taylor",
      email: "sarah@example.com",
      phone: "777666555",
      userId: "sarah_s",
    },
    {
      name: "Peter Brown",
      email: "peter@example.com",
      phone: "123987456",
      userId: "peter_p",
    },
    {
      name: "Jennifer Davis",
      email: "jennifer@example.com",
      phone: "456123789",
      userId: "jen88",
    },
    {
      name: "Daniel Clark",
      email: "daniel@example.com",
      phone: "789456123",
      userId: "dannyboy",
    },
    {
      name: "Natalie Anderson",
      email: "natalie@example.com",
      phone: "369258147",
      userId: "nat_nat",
    },
    {
      name: "Brian Wilson",
      email: "brian@example.com",
      phone: "147258369",
      userId: "brian_b",
    },
    {
      name: "Michelle Martinez",
      email: "michelle@example.com",
      phone: "258369147",
      userId: "mich_m",
    },
    {
      name: "Matthew Taylor",
      email: "matthew@example.com",
      phone: "369147258",
      userId: "matt_t",
    },
    {
      name: "Jessica Garcia",
      email: "jessica@example.com",
      phone: "456789123",
      userId: "jess_g",
    },
  ];
}

const Users = async () => {
  const data = await getData();
  //   console.log("data", data);
  const searchParam = "name";
  const pageTitle = "All User";

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        searchParam={searchParam}
        pageTitle={pageTitle}
      />
    </div>
  );
};

export default Users;
