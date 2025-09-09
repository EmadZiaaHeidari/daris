let products = [
    { id: 1, name: "Laptop", price: "$1200" },
    { id: 2, name: "Phone", price: "$800" },
  ];
  
  export async function GET() {
    return Response.json(products);
  }
  