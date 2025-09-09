let users = [
    { id: 1, name: "Ali", email: "ali@example.com" },
    { id: 2, name: "Sara", email: "sara@example.com" },
  ];
  
  export async function GET() {
    return Response.json(users);
  }
  