import React from "react";
import { Link } from "react-router";


const TeamCard = ({ name, role, img }) => {
  return (
    <div className="card bg-base-100 card-shadow p-6 items-center text-center transition-all">
      <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-2 ring-primary/30">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h4 className="font-semibold text-base-content">{name}</h4>
      <p className="text-sm opacity-70">{role}</p>
    </div>
  );
};


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">

      
      <section className="bg-secondary  py-16 sm:py-20">
        <div className="w-11/12 mx-auto max-w-6xl flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-2xl text-[#009368] sm:text-3xl md:text-4xl font-bold mb-4">
              About Plate Share
            </h1>
            <p className="text-[#009368] sm:text-lg opacity-90 mb-6">
              Plate Share connects surplus food with people in need and
              community kitchens. We reduce waste and nourish communities
              through respectful food redistribution.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/available-foods" className="btn bg-[#009368] text-white hover:bg-white hover:text-[#009368] border-[#009368]">
                See Available Foods
              </Link>
              <Link
                to="/add-food"
                className="btn  border "
              >
                Donate Food
              </Link>
            </div>
          </div>

          <div className="flex-1 card-shadow w-full">
            <div className="rounded-xl overflow-hidden shadow-lg bg-white/10 p-2">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947"
                alt="Community food sharing"
                className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="w-11/12 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Our Mission
            </h2>
            <p className="opacity-80 mb-4 leading-relaxed">
              We build resilient communities by redistributing surplus food
              from restaurants, stores, and neighbors to people and
              organizations that need it most.
            </p>
            <p className="opacity-80 leading-relaxed">
              Transparency, food safety, and dignity guide every donation
              and delivery.
            </p>
          </div>

          <div className="card card-shadow bg-base-200 shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary">12k+</div>
            <div className="text-sm opacity-70 mb-4">Meals Shared</div>

            <div className="divider" />

            <div className="text-2xl font-bold text-primary">480+</div>
            <div className="text-sm opacity-70">Active Donors</div>
          </div>
        </div>
      </section>

     
      <section className="py-10 sm:py-12 bg-base-200">
        <div className="w-11/12 mx-auto max-w-6xl">
          <h3 className="text-lg sm:text-xl font-semibold mb-6">
            How It Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Donate",
                desc: "List surplus food quickly with pickup details.",
              },
              {
                title: "Match",
                desc: "Nearby volunteers or kitchens claim and collect.",
              },
              {
                title: "Share",
                desc: "Food reaches people and organizations in need.",
              },
            ].map((item, i) => (
              <div key={i} className="card card-shadow bg-base-100 shadow p-6">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-12">
        <div className="w-11/12 mx-auto max-w-6xl">
          <h3 className="text-lg sm:text-xl font-semibold mb-6">
            Meet The Team
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <TeamCard
              name="Aisha Rahman"
              role="Founder & CEO"
              img="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
            />
            <TeamCard
              name="Carlos Mendes"
              role="Operations Lead"
              img="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            />
            <TeamCard
              name="Lina Zhang"
              role="Community Manager"
              img="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
            />
            <TeamCard
              name="Michael O'Connor"
              role="Tech Lead"
              img="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
            />
          </div>
        </div>
      </section>

      
      <section className="py-10 sm:py-12 bg-secondary text-gary-600">
        <div className="w-11/12 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold">
              Join us in reducing food waste
            </h4>
            <p className="">
              Donate, volunteer, or partner with Plate Share today.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/add-food" className="btn bg-[#009368] text-white hover:bg-white hover:text-[#009368] border-[#009368]">
              Donate Now
            </Link>
            <Link
              to="/available-foods"
              className="btn border"
            >
              Find Food
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
