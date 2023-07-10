import Image from "next/image";
import { Breadcrumbs } from "@/components/custom";
import ContactUsImage from "../../../../../public/ContactUs.jpg";

export default function AboutUsPage() {
  return (
    <div className="container mt-8 flex flex-col gap-8">
      <Breadcrumbs
        items={[
          {
            name: "About Us",
            href: "/about-us",
          },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="hidden lg:flex">
          <Image
            src={ContactUsImage}
            alt="About Us"
            className="min-h-[800px] object-cover rounded-md m-0"
            width="0"
            height="0"
          />
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-semibold tracking-wide">About us</h1>
          <p>
            Welcome to Eco, your trusted destination for premium building
            materials. We are dedicated to providing builders and construction
            companies with top-of-the-line products that meet the highest
            industry standards. With our extensive range of sustainable and
            eco-friendly materials, we strive to support environmentally
            conscious construction practices while ensuring durability and
            aesthetic appeal.
            <br />
            <br />
            At Eco, we understand the importance of reliable and long-lasting
            materials for every construction project. That&apos;s why we
            meticulously source our products from trusted suppliers known for
            their expertise and commitment to quality. From foundation to
            finishing touches, we offer a comprehensive selection of building
            materials that cater to diverse project requirements.
            <br />
            <br />
            Our inventory includes a wide range of construction essentials, such
            as structural components, roofing materials, insulation solutions,
            flooring options, plumbing fixtures, electrical supplies, and much
            more. Whether you&apos;re constructing residential buildings,
            commercial spaces, or infrastructure projects, we have the materials
            to fulfill your needs.
            <br />
            <br />
            What sets Eco apart is our dedication to sustainability. We
            prioritize materials that minimize environmental impact without
            compromising on performance. Our eco-friendly product range
            encompasses materials made from recycled content, renewable
            resources, and those with low carbon footprints. By choosing Eco,
            you contribute to creating greener and more sustainable communities.
            <br />
            <br />
            To ensure customer satisfaction, we have a knowledgeable team of
            experts who are ready to assist you with product selection and
            provide valuable advice. We understand that every project is unique,
            and our professionals are here to help you find the perfect
            materials that align with your specifications, budget, and timeline.
            <br />
            <br />
            In addition to our outstanding product offerings, we strive to
            provide a seamless and reliable purchasing experience. Our efficient
            logistics ensure timely deliveries, allowing you to stay on
            schedule. We value our relationships with builders and construction
            companies, and we continuously work to exceed your expectations.
            <br />
            <br />
            Partner with Eco for your building material needs and experience the
            difference that quality, sustainability, and expertise can make in
            your construction projects. Discover our extensive range of
            eco-friendly options and build with confidence, knowing you&apos;ve
            made a responsible choice for the environment and future
            generations. Contact us today to explore our catalog and embark on a
            greener construction journey with Eco.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
