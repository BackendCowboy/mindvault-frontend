import Layout from "@/components/ui/layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-[70vh]">
        <Button>Click me</Button>
      </div>
    </Layout>
  );
}