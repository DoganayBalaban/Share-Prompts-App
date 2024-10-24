import "@styles/globals.css";
import Nav from "@components/Nav.jsx";
import Provider from "@components/Provider.jsx";

export const metadata = {
  title: "Promptopia",
  description: "Discover the best prompts for your next writing session.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
