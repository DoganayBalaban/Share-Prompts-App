import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Bul & Paylaş
        <br className="max-md:hidden" />
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia yaratıcı promptları bulmak, oluşturmak ve paylaşmak için açık
        kaynak kodlu bir prompt uygulamasıdır.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
