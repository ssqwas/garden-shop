import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white py-20 px-10">
      <div className="w-full">
        <div className="flex flex-col gap-10">
          <h2 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%]">
            Contact
          </h2>

          <div className="flex flex-col gap-8">
            {/* Phone and Socials Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 p-8 rounded-big bg-light-grey">
                <div className="text-txt-grey font-medium text-xl leading-[130%]">
                  Phone
                </div>
                <div className="text-txt-black font-semibold text-2xl md:text-3xl lg:text-[40px] leading-[110%]">
                  +7 (499) 350-66-04
                </div>
              </div>

              <div className="flex flex-col gap-4 p-8 rounded-big bg-light-grey">
                <div className="text-txt-grey font-medium text-xl leading-[130%]">
                  Socials
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-11 h-11 text-txt-black" />
                  </a>
                  <a
                    href="#"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="WhatsApp"
                  >
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
                      <path
                        d="M21.959 3C11.4824 3 2.95898 11.5228 2.95898 22C2.95898 25.6862 4.01598 29.24 6.02236 32.3263L3.06165 39.2348C2.85755 39.7098 2.96393 40.2628 3.33008 40.6289C3.57253 40.8714 3.89661 41 4.22565 41C4.39388 41 4.56396 40.9666 4.72477 40.8973L11.6333 37.936C14.7189 39.9436 18.2728 41 21.959 41C32.4362 41 40.959 32.4772 40.959 22C40.959 11.5228 32.4362 3 21.959 3ZM31.7113 28.8009C31.7113 28.8009 30.1317 30.8271 28.99 31.3008C26.088 32.502 21.9911 31.3008 17.324 26.635C12.6581 21.9678 11.4564 17.871 12.6581 14.969C13.1319 13.826 15.1581 12.2477 15.1581 12.2477C15.7073 11.8197 16.5608 11.8729 17.0531 12.3652L19.3452 14.6573C19.8376 15.1496 19.8376 15.9561 19.3452 16.4484L17.9066 17.8858C17.9066 17.8858 17.324 19.6349 20.8234 23.1355C24.3229 26.635 26.0732 26.0523 26.0732 26.0523L27.5105 24.6137C28.0029 24.1214 28.8094 24.1214 29.3017 24.6137L31.5938 26.9059C32.0861 27.3982 32.1393 28.2505 31.7113 28.8009Z"
                        fill="#282828"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Address and Working Hours Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 p-8 rounded-big bg-light-grey">
                <div className="text-txt-grey font-medium text-xl leading-[130%]">
                  Address
                </div>
                <div className="text-txt-black font-semibold text-2xl md:text-3xl lg:text-[40px] leading-[110%]">
                  Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
                </div>
              </div>

              <div className="flex flex-col gap-4 p-8 rounded-big bg-light-grey">
                <div className="text-txt-grey font-medium text-xl leading-[130%]">
                  Working Hours
                </div>
                <div className="text-txt-black font-semibold text-2xl md:text-3xl lg:text-[40px] leading-[110%]">
                  24 hours a day
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-[350px] rounded-big overflow-hidden bg-grey-divider">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.5520385537146!2d37.62308831592385!3d55.67578998055045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b0d4b0d4b0d%3A0x0!2zNTXCsDQwJzMyLjgiTiAzN8KwMzcnMzAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
