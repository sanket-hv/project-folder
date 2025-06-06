import Container from "@/components/Container"; // Adjust import path as needed
import CategoryCard from "@/components/CategoryCard"; // Your improved card component

const CategoryList = () => {

    const categoryData = [
    {
      categoryName: "Category 1",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
      href: "/products",
    },
    {
      categoryName: "Category 2",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
      href: "/products",
    },
    {
      categoryName: "Category 3",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
      href: "/products/fruits",
    },
    {
      categoryName: "Category 4",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
      href: "/products/coffee",
    },
    {
      categoryName: "Category 5",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
      href: "/products/water",
    },
    {
      categoryName: "Category 6",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
      href: "/products/river",
    },
    {
      categoryName: "Category 7",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
      href: "/products/bridge",
    },
    {
      categoryName: "Category 8",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
      href: "/products/mobile",
    },
    {
      categoryName: "Category 9",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
      href: "/products/vehicle",
    },
    {
      categoryName: "Category 10",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
      href: "/products/bus",
    },
    {
      categoryName: "Category 11",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
      href: "/products/train",
    },
    {
      categoryName: "Category 12",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
      href: "/products/plane",
    },
  ];
  return (
    <Container>
      <h1 className="text-4xl py-4 font-semibold">Category List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData?.map((item:any, index:number) => (
          <CategoryCard
            key={index}
            categoryName={item.categoryName}
            imgUrl={item.imgUrl}
            href={item.href}
          />
        ))}
      </div>
    </Container>
  );
};

export default CategoryList;