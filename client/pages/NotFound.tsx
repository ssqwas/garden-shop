import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="w-full px-10 py-20">
        <div className="flex flex-col items-center gap-8 max-w-[691px] mx-auto text-center">
          {/* 404 SVG */}
          <svg
            className="w-full max-w-[691px] h-auto"
            viewBox="0 0 691 270"
            fill="none"
          >
            <path
              d="M98.8445 151.709V108.794H151.608V151.709H179.398V199.196H151.608V257.94H98.8445V199.196H0V157.337L87.5882 12.0601H147.387L64.0203 151.709H98.8445Z"
              fill="#339933"
            />
            <image href="/404-cactus.png" x="210" y="0" width="270" height="270" />
            <path
              d="M610.242 151.709V108.794H663.006V151.709H690.795V199.196H663.006V257.94H610.242V199.196H511.397V157.337L598.986 12.0601H658.785L575.418 151.709H610.242Z"
              fill="#339933"
            />
          </svg>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-txt-black text-center font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%]">
                Page Not Found
              </h1>
              <p className="text-txt-grey text-center font-medium text-xl leading-[130%]">
                We're sorry, the page you requested could not be found.
                <br />
                Please go back to the homepage.
              </p>
            </div>

            <Link to="/">
              <Button className="bg-green hover:bg-green/90 text-white font-semibold text-xl px-14 py-4 h-auto rounded-small">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
