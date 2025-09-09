let orders = [
    { id: 1, customer: "Ali", total: "$2000", status: "Paid" },
    { id: 2, customer: "Sara", total: "$800", status: "Pending" },
  ];
  
  export async function GET() {
    return Response.json(orders);
  }
  