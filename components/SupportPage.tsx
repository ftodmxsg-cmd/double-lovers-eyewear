
import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* Editorial Header with Video Background */}
      <section className="relative bg-black text-white py-32 lg:py-48 overflow-hidden">
        {/* Video Layer */}
        <div className="absolute inset-0 z-0 opacity-40">
           <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-movement-of-fluid-shapes-in-monochrome-42475-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-neutral-400 block mb-6">Customer Service</span>
          <h1 className="text-6xl lg:text-[120px] font-[900] tracking-tighter uppercase leading-[0.8] brand-font mb-12 italic">
            HOW CAN WE<br/>HELP YOU?
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-12 py-24 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Quick Links / Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6">Direct Support</h3>
              <div className="flex flex-col gap-4">
                <a href="mailto:support@doublelovers.com" className="text-2xl font-[900] tracking-tighter hover:opacity-50 transition-opacity underline decoration-1 underline-offset-8">support@doublelovers.com</a>
                <p className="text-[14px] text-neutral-400 font-medium">Monday — Friday<br/>10:00 AM — 06:00 PM (KST)</p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6">Topics</h3>
              <ul className="flex flex-col gap-4 text-[13px] font-bold uppercase tracking-widest">
                <li><button className="hover:opacity-50 transition-all border-b-2 border-black pb-1 w-fit">Order Status</button></li>
                <li><button className="hover:opacity-50 transition-all text-neutral-300">Shipping & Delivery</button></li>
                <li><button className="hover:opacity-50 transition-all text-neutral-300">Returns & Exchanges</button></li>
                <li><button className="hover:opacity-50 transition-all text-neutral-300">Product Care</button></li>
                <li><button className="hover:opacity-50 transition-all text-neutral-300">Size Guide</button></li>
              </ul>
            </div>
          </div>

          {/* Main Content: FAQ Inspired */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="space-y-12">
              <div className="border-b border-neutral-100 pb-12">
                <h4 className="text-[18px] font-[900] tracking-tight uppercase mb-4">When will my order ship?</h4>
                <p className="text-[15px] leading-relaxed text-neutral-500 font-medium max-w-2xl">
                  Orders are typically processed within 1-3 business days. Once your order has shipped, you will receive a confirmation email with tracking information.
                </p>
              </div>

              <div className="border-b border-neutral-100 pb-12">
                <h4 className="text-[18px] font-[900] tracking-tight uppercase mb-4">What is your return policy?</h4>
                <p className="text-[15px] leading-relaxed text-neutral-500 font-medium max-w-2xl">
                  We accept returns for unworn items in their original packaging within 14 days of receipt. Please contact our support team to initiate a return request.
                </p>
              </div>

              <div className="border-b border-neutral-100 pb-12">
                <h4 className="text-[18px] font-[900] tracking-tight uppercase mb-4">Do you ship internationally?</h4>
                <p className="text-[15px] leading-relaxed text-neutral-500 font-medium max-w-2xl">
                  Yes, we ship globally. International shipping rates and delivery times vary by destination and will be calculated at checkout.
                </p>
              </div>

              <div className="border-b border-neutral-100 pb-12">
                <h4 className="text-[18px] font-[900] tracking-tight uppercase mb-4">How do I care for my frames?</h4>
                <p className="text-[15px] leading-relaxed text-neutral-500 font-medium max-w-2xl">
                  To keep your DOUBLE LOVERS frames in perfect condition, we recommend using the provided microfiber cloth for cleaning and storing them in the protective case when not in use. Avoid exposure to extreme heat.
                </p>
              </div>
            </div>

            {/* Contact Form Teaser */}
            <div className="bg-neutral-50 p-10 lg:p-16 flex flex-col items-center text-center gap-8 mt-12">
              <h3 className="text-3xl font-[900] tracking-tighter uppercase brand-font">Still need help?</h3>
              <p className="text-[14px] text-neutral-400 font-medium max-w-sm">Our concierge team is available to assist you with any questions regarding our products or your order.</p>
              <button className="px-12 py-5 bg-black text-white text-[11px] font-[900] uppercase tracking-[0.4em] hover:opacity-80 transition-opacity">
                Send a Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
