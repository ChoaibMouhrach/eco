import { Button, Input } from "ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileData, User } from "@/index";
import withAuth from "@/middlewares/withAuth";
import DashboardLayout from "../../Layouts/DashboardLayout";
import useUpdateProfile from "@/hooks/useUpdateProfile";

interface ProfilePageProps {
  user: User;
}

const schema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  email: z.string().email(),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/),
  address: z.string().min(3).max(255),
});

export default function ProfilePage({ user }: ProfilePageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateProfile, isLoading } = useUpdateProfile();

  const onSubmit = (data: UpdateProfileData) => {
    updateProfile(data);
  };

  return (
    <DashboardLayout user={user}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border rounded-md border-gray-300"
      >
        <div className="p-4 border-b border-gray-300 flex flex-col gap-2">
          <h2 className="tracking-wide font-semibold text-xl">
            Update Profile
          </h2>
          <p className="text-neutral-600 text-sm">
            You can Update Profile just from here
          </p>
        </div>

        <div className="flex py-4 flex-col p-2 gap-2">
          <Input
            error={errors.firstName?.message}
            defaultValue={user.firstName}
            {...register("firstName")}
            placeholder="First Name"
          />
          <Input
            error={errors.lastName?.message}
            defaultValue={user.lastName}
            {...register("lastName")}
            placeholder="Last Name"
          />
          <Input
            error={errors.email?.message}
            defaultValue={user.email}
            {...register("email")}
            placeholder="Email Address"
          />
          <Input
            error={errors.phone?.message}
            defaultValue={user.phone}
            {...register("phone")}
            placeholder="Phone Number"
          />
          <Input
            error={errors.address?.message}
            defaultValue={user.address}
            {...register("address")}
            placeholder="Address"
          />
        </div>

        <div className="p-2 border-t border-gray-300">
          <Button isLoading={isLoading}>Update Profile</Button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
