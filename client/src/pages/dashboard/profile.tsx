import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/Card/CardBody";
import CardFooter from "@/components/Card/CardFooter";
import CardHeader from "@/components/Card/CardHeader";
import Input from "@/components/Input";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function Profile() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <h1 className="text-2xl tracking-wide font-bold" >Profile</h1>
          <p className="text-neutral-500" >Update You Profile Informations</p>
        </CardHeader>
        <form>
          <CardBody>
            <div className="flex flex-col gap-3" >
              <div className="flex flex-col lg:flex-row gap-3" >
                <Input placeholder='First Name...' name="firstName" id="firstName" type="text" />
                <Input placeholder='Last Name...' name="lastName" id="lastName" type="text" />
              </div>
              <Input placeholder='Email Address...' name="email" id="email" type="email" />
              <Input placeholder='Password...' name="password" id="password" type="password" />
              <Input placeholder='Password Confirmation...' name="password_confirmation" id="password" type="password" />
            </div>
          </CardBody>
          <CardFooter>
            <Button>Update</Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardLayout>
  );
}
