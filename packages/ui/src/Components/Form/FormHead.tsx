interface FormHeadProps {
  title: string;
  description: string;
}

export function FormHead({ title, description }: FormHeadProps) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <h3 className="font-semibold text-2xl">{title}</h3>
      <p className="text-neutral-500">{description}</p>
    </div>
  );
}
